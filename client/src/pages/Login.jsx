import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Login = () => {
  const [signupIput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginIput, setLoginInput] = useState({ email: "", password: "" });

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupIput, [name]: value });
    } else {
      setLoginInput({ ...loginIput, [name]: value });
    }
  };

  const handelRegisation = (type) =>{
    const inputData = type === "signup" ? signupIput : loginIput;
    console.log(inputData);
    
  }
  return (
    <div className="flex items-center w-full justify-center">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when youre done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  onChange={(e)=> changeInputHandler(e,"signup")}
                  placeholder="Eg.suchi"
                  required="ture"
                  name="name"
                  value={signupIput.name}   
                 

                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  onChange={(e)=> changeInputHandler(e,"signup")}
                  
                  required="ture"
                  name="email"
                  value={signupIput.email}
                  placeholder="suchi@gmail.com"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  onChange={(e)=> changeInputHandler(e,"signup")}
                 
                  required="ture"
                  name="password"
                  value={signupIput.password} 
                   placeholder="xyz"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handelRegisation("signup")}>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login with your username and password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={loginIput.email}
                  placeholder=" suchi@gmail.com"
                  required="true"
                  onChange={(e)=> changeInputHandler(e,"login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">Password</Label>
                <Input 
                type="password" 
                name="password"
                value={loginIput.password}
                onChange={(e)=> changeInputHandler(e,"login")}
                
                  required="true" 
                     placeholder="xyz"
                  />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handelRegisation("login")}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
