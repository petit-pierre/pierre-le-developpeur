function Account({ accountInfo }) {
  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{accountInfo.title}</h3>
        <p className="account-amount">
          $
          {accountInfo.balance.toLocaleString("en-US", {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="account-amount-description">Available Balance</p>
      </div>
      <div className="account-content-wrapper cta">
        <button className="transaction-button">View transactions</button>
      </div>
    </section>
  );
}

export default Account;
