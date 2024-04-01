
function Error(){
    return (
        <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
           <span className="text-4xl text-foreground">404 Not Found 📃</span>
           <span className=" font-medium text-muted-foreground">Requested resource does not exists!</span>
        </div>
    )
}

export default Error;
