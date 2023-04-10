
const UserService = {
  userRepository: null,
  ipLogRepository: null,
  authenticationManager: null,
  roleRepository: null,
  passwordEncoder: null,
  jwtProvider: null,
  requestService: null,
  javaMailSender: null,

  init(userRepository, authenticationManager, javaMailSender, ipLogRepository, roleRepository, passwordEncoder, jwtProvider, requestService) {
    this.userRepository = userRepository;
    this.authenticationManager = authenticationManager;
    this.roleRepository = roleRepository;
    this.ipLogRepository = ipLogRepository;
    this.passwordEncoder = passwordEncoder;
    this.jwtProvider = jwtProvider;
    this.javaMailSender = javaMailSender;
    this.requestService = requestService;

    if (roleRepository.findUserRoleByRoleName("ROLE_AUTHOR").isEmpty())
      roleRepository.save(new UserRole("ROLE_AUTHOR", "ROLE_AUTHOR"));

    if (roleRepository.findUserRoleByRoleName("ROLE_ADMIN").isEmpty())
      roleRepository.save(new UserRole("ROLE_ADMIN", "ROLE_ADMIN"));

    if (userRepository.findByUserName("SUPER_MANAGER").isEmpty()) {
      let roles = new Array();
      if (roleRepository.findUserRoleByRoleName("ROLE_SUPER").isEmpty())
        roleRepository.save(new UserRole("ROLE_SUPER", "ROLE_SUPER"));
      roles.add(roleRepository.findUserRoleByRoleName("ROLE_AUTHOR").get());
      roles.add(roleRepository.findUserRoleByRoleName("ROLE_ADMIN").get());
      roles.add(roleRepository.findUserRoleByRoleName("ROLE_SUPER").get());
      let u = new User("SUPER_MANAGER", "$2a$13$M0v0g9XA7NETbB/I7SodkOcx2mugp4LuoDxMt/ck1b2JxaA8K5ja.", roles, "qqq123@gmail.com");
      u.setActivated(true);
      userRepository.save(u);
    }
  }
};

    
const { userRepository, ipLogRepository, authenticationManager, roleRepository, passwordEncoder, jwtProvider, requestService, javaMailSender } = require('./dependencies');

const UserService = {
  async sendActivationCode(userName) {
    const user = await userRepository.findByUserName(userName);
    if (!user) return false;
    const userEmail = user.email;
    const msg = {
      to: userEmail,
      subject: 'Lomy Activation Code',
      text: `your activation code is: ${user.activationCode}`,
    };
    await javaMailSender.send(msg);
    return true;
  },

  async activateUser(email, activationCode) {
    const user = await userRepository.findByEmail(email);
    if (!user) return false;
    if (user.activationCode === activationCode) {
      user.activationCode = Math.floor(Math.random() * 8999 + 1000);
      user.activated = true;
      await userRepository.save(user);
      return true;
    }
    user.activationCode = Math.floor(Math.random() * 8999 + 1000);
    const userEmail = user.email;
    const msg = {
      to: userEmail,
      subject: 'Lomy Activation Code',
      text: `your activation code is: ${user.activationCode}`,
    };
    await javaMailSender.send(msg);
    await userRepository.save(user);
    return false;
  },

  async signin(loginDTO, httpServletRequest) {
    const { username, password } = loginDTO;
    let token = null;
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
  },

  async signup(userDTO) {
    if (await userRepository.findByUserName(userDTO.userName)) return null;
    const role = await roleRepository.findUserRoleByRoleName('ROLE_AUTHOR');
    const user = await userRepository.save(new User(userDTO.userName,
      passwordEncoder.encode(userDTO.password),
      [role],
      userDTO.email,
    ));
    user.password = '';
    return user;
  },

  async getAll() {
    return await userRepository.findAll();
  },

  async getByUserName(userName) {
    return await userRepository.findByUserName(userName);
  },
};

module.exports = UserService;
