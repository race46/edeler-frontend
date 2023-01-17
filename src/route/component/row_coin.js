export default ({account}) => {
    if (!account || !account.balances) return (<></>)
    return (
        account.balances.map(coin => {
                return (
                    <tr key={coin.asset}>
                        <td>
                            <div className="d-flex align-items-center">
                                <img
                                    src={coin.image}
                                    className="rounded-circle"
                                    alt=""
                                    style={{width: "45px", height: "45px"}}
                                />
                                <div className="ms-3">
                                    <p className="fw-bold mb-1">{coin.asset}</p>
                                    <p className="text-muted mb-0">${coin.total}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p className="fw-normal mb-1">{coin.free} free</p>
                            <p className="text-muted mb-0">{coin.locked} locked</p>
                        </td>
                    </tr>)
            }
        ))
}
