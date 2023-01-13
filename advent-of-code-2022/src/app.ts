class App {
    public static async start() {
        const day = process.argv[2];
        if (day === undefined)
            throw Error("pass day number to yarn start call");
        const { solution } = await import(`./day${day}`);
        const s = solution();
        if (s !== undefined) {
            console.log(`day ${day} solution:`);
            console.log(s);
        }
    }
}

App.start();
