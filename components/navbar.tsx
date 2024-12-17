import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { useGetStoresList } from "@/hooks/useGetAllStores";

const Navbar = () => {
    const { data: stores , isLoading} = useGetStoresList();
    if(isLoading) return null;
    return ( 
        <div className="border-b">
            <div className="flex h-16 items-center px-4">
            <StoreSwitcher items={stores} />
            <MainNav className="mx-6" />
            <div className="ml-auto flex itesm-center space-x-4">
                <UserButton afterSwitchSessionUrl="/" />
            </div>
            </div>
            
        </div>
    )
};

export default Navbar;