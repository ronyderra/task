const checkWinner = async (req: any, res: any) => {
    try {
        if (!req.body || !req.body.squares) {
            res.status(404).send("Missing Data")
            return;
        }
        const { squares } = req.body
        const combos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combo of combos) {
            const [a, b, c] = combo;
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                res.status(200).json({ result: squares[a] });
                return;
            }
        }
        res.status(200).json({ result: null });
    } catch (e: any) {
        res.status(500).json({ message: e.toString() });
    }
}
export default checkWinner