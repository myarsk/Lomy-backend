class UserService {
  constructor(userRepository, authenticationManager, javaMailSender, ipLogRepository, roleRepository, passwordEncoder, jwtProvider, requestService) {
    this.userRepository = userRepository;
    this.authenticationManager = authenticationManager;
    this.roleRepository = roleRepository;
    this.ipLogRepository = ipLogRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtProvider = jwtProvider;
    this.javaMailSender = javaMailSender;
    this.requestService = requestService;
    this.createSuperUser();
  }

  createSuperUser() {
    if (this.roleRepository) {
      this.roleRepository.findUserRoleByRoleName("ROLE_SUPER", (err, role) => {
        if (err) {
          // handle error
        } else if (!role) {
          this.roleRepository.save(new UserRole("ROLE_SUPER", "ROLE_SUPER"), (err, role) => {
            if (err) {
              // handle error
            } else {
              this.createSuperUserWithRole(role);
            }
          });
        } else {
          this.createSuperUserWithRole(role);
        }
      });
    } else {
      // Handle error
    }
  }

  createSuperUserWithRole(role) {
    // Create a super user with the given role
  }



  createSuperUserWithRole(role) {
    let roles = [];
    this.roleRepository.findUserRoleByRoleName("ROLE_AUTHOR", (err, authorRole) => {
      if (err) {
        // handle error
      } else {
        roles.push(authorRole);
        this.roleRepository.findUserRoleByRoleName("ROLE_ADMIN", (err, adminRole) => {
          if (err) {
            // handle error
          } else {
            roles.push(adminRole);
            roles.push(role);
            let user = new user("KH@LIL", "P@ssw0rd.2023", roles, "qqq123@gmail.com");
            user.setActivated(true);
            this.userRepository.save(user);
          }
        });
      }
    });
  }
};

          async function sendActivationCode(userName) {
              const user = await userRepository.findByUserName(userName);
              if (!user)
                  return false;
              const userEmail = user.email;
              const msg = {
                  to: userEmail,
                  subject: 'Lomy Activation Code',
                  text: `your activation code is: ${user.activationCode}`
              };
              await javaMailSender.send(msg);
              return true;
          }
          
          async function activateUser(email, activationCode) {
              const user = await userRepository.findByEmail(email);
              if (!user)
                  return false;
              else {
                  if (user.activationCode === activationCode) {
                      // generate new activation code for next time
                      user.setActivationCode();
                      user.setActivated(true);
                      await userRepository.save(user);
                      return true;
                  }
                  user.setActivationCode();
                  const userEmail = user.email;
                  const msg = {
                      to: userEmail,
                      subject: 'Lomy Activation Code',
                      text: `your activation code is: ${user.activationCode}`
                  };
                  await javaMailSender.send(msg);
                  await userRepository.save(user);
              }
              return false;
          }
          
          async function signin(loginDTO, httpServletRequest) {
              const username = loginDTO.username;
              const password = loginDTO.password;
              const token = null;
              const user = await userRepository.findByUserName(username);
              console.log(requestService.getClientIP(httpServletRequest));
              const objects = [];
              if (user) {
                  if (!user.activated) {
                      objects.push('NOT ACTIVATED');
                      return objects;
                  }
      try {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        token = jwtProvider.createToken(username, user.roles);
        objects.push(token);
        objects.push(user.roles);
        const log = new IPLog(user, ActivityType.LOGIN);
        await ipLogRepository.save(log);
        console.log(`user: ${username}, have Email: ${user.email}, ip: ${requestService.getClientIP(httpServletRequest)}`);
      } catch (error) {
        console.error(error);
      }
    }
    return objects;
  }
  const jwtProvider = require('../security/JwtProvider');
  const IPLog = require('../model/IPLog');
  const ActivityType = require('../model/ActivityType');
  const ipLogRepository = require('../repository/IPLogRepository');
  const requestService = require('../security/RequestService');
  
  exports.authenticate = function(username, password, httpServletRequest) {
    let objects = [];
    authenticationManager.authenticate(username, password, function(err, user) {
      if (err) {
        // handle error
      } else {
        let token = jwtProvider.createToken(username, user.roles);
        objects.push(token);
        objects.push(user.roles);
        let log = new IPLog(user, ActivityType.LOGIN);
        ipLogRepository.save(log);
        console.log(`user: ${username}, have Email: ${user.email}, ip: ${requestService.getClientIP(httpServletRequest)}`);
      }
    });
    return objects;
  };
  
module.exports = UserService;
