import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import USER from "../models/user"
interface DecPair {
    firstUser: string,
    secondUser: string,
    decliendTime: number
}
interface Pair {
    firstUser: string,
    secondUser: string,
}

let declinedPairs: DecPair[] = [],
    approvedGames: string[] = []

export const socketsHandler = (clientAppSocket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    clientAppSocket.setMaxListeners(0)
    clientAppSocket.on("connection", (socket: any) => {
        socket.on("enteredLobby", async (userName: string) => {
            await USER.updateInLoby(userName, true)
        });
        socket.on("exitLobby", async (userName: any) => {
            await USER.updateInLoby(userName, false)
        });
        socket.on("declinedGame", async (data: any) => {
            const { against, userName } = JSON.parse(data)
            await USER.updateInLoby(userName, true)
            await USER.updateInLoby(against, true)
            clientAppSocket.emit(against, "declinedGame");
            const d1 = new Date();
            const result = d1.getTime();
        });
        socket.on("approveGame", async (data: any) => {
            const { userName, against } = JSON.parse(data)
            if (approvedGames.includes(against)) {
                clientAppSocket.emit(userName, JSON.stringify({ event: "goPlay", against: against, xOrO: "x" }));
                clientAppSocket.emit(against, JSON.stringify({ event: "goPlay", against: userName, xOrO: "o" }));
                await USER.updateInLoby(userName, false)
                await USER.updateInLoby(against, false)
                declinedPairs.filter(item => item.firstUser !== userName || item.secondUser !== userName || item.firstUser !== against || item.secondUser !== against)
                approvedGames.filter(item => item !== userName || item !== against)
            } else {
                approvedGames.push(userName)
            }
        });
        socket.on("disconnect", (transport: any) => {
            console.log({ transport });
        });
        socket.on("moved", (data: any) => {
            const { playAgainst, ind, xOrO } = JSON.parse(data)
            clientAppSocket.emit(playAgainst, JSON.stringify({ event: "game", ind, xOrO }));
        });
    });
}

export const sendPair = async (clientAppSocket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    const inLobbyUsers = await USER.getLobby()
    if (inLobbyUsers.length < 2) return;
    const randomly = inLobbyUsers.sort((a, b) => 0.5 - Math.random());
    for (let index = 0; index < randomly.length; index += 2) {
        if (!randomly[index + 1]) continue;
        clientAppSocket.emit(randomly[index]?.userName, JSON.stringify({ against: randomly[index + 1]?.userName }));
        clientAppSocket.emit(randomly[index + 1]?.userName, JSON.stringify({ against: randomly[index]?.userName }));
        await USER.updateInLoby(randomly[index]?.userName, false)
        await USER.updateInLoby(randomly[index + 1]?.userName, false)
    }
}

