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
    availableMatches: Pair[] //filterd decline

// let inLobbyUsers: string[] = ["Boaz", "Uri", "Rony", "Alex", "Mami", "Yura"],
//     declinedPairs: DecPair[] = [{
//         firstUser: "Boaz",
//         secondUser: "Alex",
//         decliendTime: 1678361869272
//     }, {
//         firstUser: "Uri",
//         secondUser: "Yura",
//         decliendTime: 1678361869272
//     }],
//     availableMatches: Pair[] //filterd decline

export const socketsHandler = (clientAppSocket: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {
    clientAppSocket.setMaxListeners(0)

    clientAppSocket.on("connection", (socket: any) => {
        socket.on("enteredLobby", (userName: string) => {
            //push to inlobby
            //execute matchUsers
            if (userName && !inLobbyUsers.includes(userName)) {
                inLobbyUsers.push(userName)
                matchUsers()
                sendPair(clientAppSocket)
            }
        });
        socket.on("exitLobby", (exitLobby: string) => {
            console.log({ exitLobby });
            //pop from inlobby and declined paires
            inLobbyUsers = inLobbyUsers.filter(item => item == exitLobby)
            declinedPairs = declinedPairs.filter(item => item.firstUser == exitLobby || item.secondUser == exitLobby)
        });
        socket.on("declinedGame", (data: any) => {
            console.log("declinedGame", JSON.parse(data));
            const against = JSON.parse(data).against
            clientAppSocket.emit(against, "declinedGame");
            //push to declined paires
            declinedPairs.push(JSON.parse(data))
            sendPair(clientAppSocket)
        });
        socket.on("disconnect", (transport: any) => {
            console.log({ transport });
            console.log(inLobbyUsers);
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
    console.log({ inLobbyUsers, declinedPairs });
    if (inLobbyUsers.length < 2) {
        console.log("smaller than 2");
        return;
    }
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

