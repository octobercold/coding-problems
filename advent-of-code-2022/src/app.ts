class App {
    public static async start() {
        const day = process.argv[2];
        if (day === undefined)
            throw Error("pass day number to yarn start call");
        try {
            const { solution } = await import(`./day${day}`);
            const s = solution();
            if (s !== undefined) {
                console.log(`day ${day} solution:`);
                console.log(s);
            }
        } catch (err) {
            // throw Error(`module does not exist ./day${day}`);
            throw new Error(err);
        }
    }
}

App.start();
