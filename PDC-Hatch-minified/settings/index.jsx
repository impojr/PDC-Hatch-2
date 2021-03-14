function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Fitbit Account</Text>}>
        <Oauth
          settingsKey="oauth"
          title="Login"
          label="Fitbit"
          status="Login"
          authorizeUrl="https://www.fitbit.com/oauth2/authorize"
          requestTokenUrl="https://api.fitbit.com/oauth2/token"
          clientId="22C5TX"
          clientSecret="e99adbf58b94011b859eaf0a203baa7c"
          scope="activity"
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);