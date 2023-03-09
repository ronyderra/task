import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
interface DecPair {
    firstUser: string,
    secondUser: string,
    decliendTime: number
}
interface Pair {
    firstUser: string,
    secondUser: string,
}

let inLobbyUsers: string[] = [],
    declinedPairs: DecPair[] = [],
    availableMatches: Pair[], //filterd decline
    approvedGames: string[] = []

export const socketsHandler = (clientAppSocket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    clientAppSocket.setMaxListeners(0)

    clientAppSocket.on("connection", (socket: any) => {

        socket.on("enteredLobby", (userName: string) => {
            if (userName && !inLobbyUsers.includes(userName)) {
                inLobbyUsers.push(userName)
                matchUsers()
            }
        });
        socket.on("exitLobby", (exitLobby: any) => {
            console.log({ exitLobby });

            // inLobbyUsers = inLobbyUsers.filter(item => item == exitLobby)
            // declinedPairs = declinedPairs.filter(item => item.firstUser == exitLobby || item.secondUser == exitLobby)
        });
        socket.on("declinedGame", (data: any) => {
            const { against } = JSON.parse(data)
            clientAppSocket.emit(against, "declinedGame");
            declinedPairs.push(JSON.parse(data))
        });
        socket.on("approveGame", (data: any) => {
            const { userName, against } = JSON.parse(data)
            if (approvedGames.includes(against)) {
                clientAppSocket.emit(userName, JSON.stringify({ event: "goPlay", against: against, xOrO: "x" }));
                clientAppSocket.emit(against, JSON.stringify({ event: "goPlay", against: userName, xOrO: "o" }));
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

//matches filterd decline
const matchUsers = () => {
    availableMatches = inLobbyUsers.flatMap((user, i) =>
        inLobbyUsers.slice(i + 1).map(secondUser =>
            ({ firstUser: user, secondUser })
        )
    ).filter(pair =>
        !declinedPairs.some(declinedPair =>
            (declinedPair.firstUser === pair.firstUser && declinedPair.secondUser === pair.secondUser) ||
            (declinedPair.firstUser === pair.secondUser && declinedPair.secondUser === pair.firstUser)
        )
    );
}

export const sendPair = (clientAppSocket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    if (inLobbyUsers.length < 2) return;
    inLobbyUsers.map((user) => {
        let pair = availableMatches.findIndex(i => i.firstUser === user || i.secondUser === user)
        if (pair !== -1) {
            const { firstUser, secondUser } = availableMatches[pair]
            console.log({ firstUser, secondUser });
            clientAppSocket.emit(firstUser, JSON.stringify({ firstUser, against: secondUser }));
            clientAppSocket.emit(secondUser, JSON.stringify({ secondUser, against: firstUser }));
            // availableMatches.splice(pair, 1);
        } else {
            const d1 = new Date();
            const result = d1.getTime();
            const declinedPairIndex = declinedPairs.findIndex(i => (i.firstUser === user || i.secondUser === user) && result >= i.decliendTime + 10)
            if (declinedPairIndex !== -1) {
                const { firstUser, secondUser } = declinedPairs[declinedPairIndex]
                clientAppSocket.to("lobby").emit(JSON.stringify({ firstUser, secondUser }));
            }
        }
    })
}

