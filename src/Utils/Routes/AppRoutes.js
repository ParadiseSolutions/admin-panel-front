import { Switch } from 'react-router-dom'
import PrivateRoutes from './PrivateRoutes'
import PublicRoutes from './PublicRoutes'
import AuthRoutes from './AuthRoutes'
import ContentRoutes from './ContentRoutes'

const AppRuter = () => {
    return (
      <Switch>
        <PublicRoutes
          path="/login"
          component={AuthRoutes}
        />
        <PrivateRoutes
          path="/"
          component={ContentRoutes}
        />
      </Switch>
    )
  }
  
  export default AppRuter;