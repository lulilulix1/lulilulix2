const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-1_tKqAhDysX",
      userPoolClientId: "bb0qig9og0vi6acode4hqoo1h",
      loginWith: {
        username: true,
        email: true
      }
    }
  }
};

export default awsconfig;
