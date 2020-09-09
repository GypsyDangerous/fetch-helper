const fetch = require("../dist/index");

test("should have json content type", async () => {
	expect(await fetch("https://api.disstreamchat.com")).toStrictEqual({
		message: "📺 DisTwitchChat API 📺",
	});
});

test("should throw error", async () => {
    try{
        await fetch("https://api.disstreamchat.com/twitch/token/refresh")
    }catch(err){
        expect(err.message).toBe("Missing or invalid Credentials")
    }
})

test("should throw 404", async () => {
    try{
        await fetch("https://api.disstreamchat.com/twitch/token/fuck")
    }catch(err){
        expect(err.message).toBe("Page Not Found")
    }
})
