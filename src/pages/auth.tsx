import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { AuthView } from 'src/sections/auth';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Sign in - ${CONFIG.appName}`}</title>
      </Helmet>

      <AuthView />
    </>
  );
}
