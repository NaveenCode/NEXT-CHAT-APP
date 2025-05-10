import Login from "@/components/auth/Login";
import Signup from "@/components/auth/Signup";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className=" flex  justify-center h-full px-5">
      <div className="w-full max-w-2xl space-y-6 py-8 h-full">
        <div className="text-center text-3xl font-bold bg-white py-4 rounded-xl shadow">
          THE REAL CHAT
        </div>

        <Tabs defaultValue="Login" className="bg-white rounded-xl  p-4 w-full ">
          <TabsList className="w-full flex justify-between  rounded-full mb-4 p-1">
            <TabsTrigger
              value="Login"
              className="data-[state=active]:bg-blue-300 rounded-full text-lg py-6 cursor-pointer transition bg-white"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="Sign Up"
              className="data-[state=active]:bg-blue-300 rounded-full text-lg py-6 cursor-pointer transition bg-white"
            >
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="Login">
            <Login />
          </TabsContent>

          <TabsContent value="Sign Up">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
