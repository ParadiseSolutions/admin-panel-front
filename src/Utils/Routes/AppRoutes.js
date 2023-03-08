import { Switch } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import AuthRoutes from './AuthRoutes'
import ContentRoutes from './ContentRoutes'
import ForgotPasswordRoute from './ForgotPasswordRoute'
import ResetPasswordRoute from './ResetPasswordRoute'

const AppRuter = () => {
    return (
      <Switch>
        
        <PublicRoutes
          path="/login"
          component={AuthRoutes}
        />
        <PublicRoutes
          path="/forgot-password"
          component={ForgotPasswordRoute}
        />
        <PublicRoutes
          path="/reset-password"
          component={ResetPasswordRoute}
        />
        <PrivateRoutes
          path="/"
          component={ContentRoutes}
        />
      </Switch>
    )
  }
  
  export default AppRuter;