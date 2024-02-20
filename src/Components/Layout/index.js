import Header from './Header'
import Sidebar from './Sidebar';
const Layout = (props) => {
    return ( 
        <>
        <Header />
        <Sidebar />
        <div className="main-content">
        

        {props.children}
        
        </div>
        
        </>
     );
}
 
export default Layout;