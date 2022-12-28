class App {
    static async start() {
        var _a;
        const day = process.argv[2];
        if (day === undefined)
            throw Error("pass day number to yarn start call");
        try {
            const { solution } = await (_a = `./day${day}`, Promise.resolve().then(() => require(_a)));
            const s = solution();
            console.log(`day ${day} solution:`);
            console.log(s);
        }
        catch (err) {
            // throw Error(`module does not exist ./day${day}`);
            throw new Error(err);
        }
    }
}
App.start();
//# sourceMappingURL=app.js.map