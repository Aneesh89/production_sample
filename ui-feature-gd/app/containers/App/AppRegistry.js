import UserRegistry from '../User/UserRegistry';
import GDRegistry from '../GeneralDiary/GDRegistry';
import FIRRegistry from '../Fir/FIRRegistry';
import HomeRegistry from './HomeRegistry';

const AppRegistry = {
    ...UserRegistry,
    ...HomeRegistry,
    ...GDRegistry,
    ...FIRRegistry   
}

export default AppRegistry;