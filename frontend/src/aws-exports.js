const awsExports = {
  Auth: {
    region: process.env.REACT_APP_AWS_REGION,
    userPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.REACT_APP_COGNITO_APP_CLIENT_ID,
    identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
  },
  Storage: {
    AWSS3: {
      bucket: process.env.REACT_APP_S3_BUCKET,
      region: process.env.REACT_APP_AWS_REGION,
    }
  }
};

export default awsExports;
