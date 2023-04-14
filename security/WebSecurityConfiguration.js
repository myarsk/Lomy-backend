//Node.js 10.14.0
//Plain Javascript and Node.js is supported
// html/css is not supported here 

const UserRoleRepository = require('../repository/UserRoleRepository');
const LomyUserDetailsService = require('../security/LomyUserDetailsService');
const JwtTokenFilter = require('../security/JwtTokenFilter');
const BCryptPasswordEncoder = require('bcryptjs');

class WebSecurityConfiguration {
  constructor(userRoleRepository, userDetailsService) {
    this.userRoleRepository = userRoleRepository;
    this.userDetailsService = userDetailsService;
  }

  configure(http) {
    http.authorizeRequests()
      .antMatchers('/api/country').hasRole('ADMIN')
      .antMatchers('/api/tag').authenticated()
      .antMatchers('/api/type').hasRole('ADMIN')
      .antMatchers('/api/post/delete').hasRole('ADMIN')
      .antMatchers('/api/post/create').hasRole('AUTHOR')
      .antMatchers('/api/post/addComment').hasRole('AUTHOR')
      .antMatchers('/api/post/likePost').hasRole('AUTHOR')
      .antMatchers('/api/post/dislikePost').hasRole('AUTHOR')
      .anyRequest().permitAll();
    
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    http.addFilterBefore(new JwtTokenFilter(this.userDetailsService), UsernamePasswordAuthenticationFilter.class);
  }

  authenticationManagerBean() {
    return super.authenticationManagerBean();
  }

  passwordEncoder() {
    return new BCryptPasswordEncoder(13);
  }
}

module.exports = WebSecurityConfiguration;