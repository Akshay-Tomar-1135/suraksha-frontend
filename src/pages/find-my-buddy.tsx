import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { FindMyBuddy } from 'src/sections/findMyBuddy/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`Find My Buddy - ${CONFIG.appName}`}</title>
      </Helmet>

      <FindMyBuddy />
    </>
  );
}
