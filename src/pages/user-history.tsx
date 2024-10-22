import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { UserHistory } from 'src/sections/userHistory/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {`User History - ${CONFIG.appName}`}</title>
      </Helmet>

      <UserHistory />
    </>
  );
}
