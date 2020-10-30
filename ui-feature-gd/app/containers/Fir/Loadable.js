/**
 *
 * Asynchronously loads the component for Fir
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
