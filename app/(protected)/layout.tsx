import Footer from '@/components/dashboard/Footer'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/frontPage/Navbar';

interface ProtectedLayoutProps {
  children: React.ReactNode;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return ( 
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}
      <div className="flex flex-grow">
        <main className="bg-gray-50 w-full">{children}</main>
      </div>
      {/* <Footer /> */}
    </div>
   );
}

export default ProtectedLayout;