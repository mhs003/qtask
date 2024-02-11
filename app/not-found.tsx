export default function notFound() {
    return (
        <>
            <head>
                <title>404: Page not found.</title>
            </head>
            <div className="h-[calc(100dvh-105px)] w-full flex justify-center items-center">
                <h3 className="text-xl font-bold pr-4 mr-4 text-foreground border-r border-r-border/100 h-14 flex justify-center items-center">
                    404
                </h3>
                <p className="text-muted-foreground">Page not found</p>
            </div>
        </>
    );
}
