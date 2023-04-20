export const getGoogleUrl = (from) => {
  const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;

  const redirectUri = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT;
  const clintId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;

  const options = {
    redirect_uri: redirectUri,
    client_id: clintId,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    state: from,
  };

  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
