import { useState } from "react"
import { useSelector } from "react-redux"
import Wallet from "../Wallet/Wallet"
import CreateWalletModal from "./CreateWalletModal"
import { useWalletList } from "./useWalletList"
import Transfer from "../Transfer/Transfer"
import plusIcon from "../../assets/plus-icon.svg"

export default function WalletList() {
  const [showModal, setShowModal] = useState(false)
  const { createNewWallet } = useWalletList(setShowModal)
  const walletState = useSelector(state => state.walletReducer)

  return (
    <section className="w-full max-w-[400px] flex flex-col justify-center gap-5 px-2 box-border">
      <header className="flex justify-between items-center">
        <h2 className="font-semibold text-[18px]">Wallet</h2>
        <button className="flex gap-5 items-center" onClick={() => setShowModal(true)}>
          <img
            className="w-[20px]"
            src={plusIcon}
            alt=""
            style={{
              filter:
                "invert(82%) sepia(57%) saturate(489%) hue-rotate(19deg) brightness(97%) contrast(101%)"
            }}
          />
          <span>Add new wallet</span>
        </button>
      </header>
      {Object.keys(walletState).length !== 0 ? (
        <Wallet />
      ) : (
        <p className="text-center">You don't have any wallet</p>
      )}
      <div className="flex flex-col gap-8">
        <div className="flex justify-between">
          <div>
            <h4>Card holder</h4>
            <span className="font-bold text-[18px]">
              {sessionStorage.first_name} {sessionStorage.last_name}
            </span>
          </div>
          <div>
            <h4>Wallet Id</h4>
            <span className="font-bold text-[18px]">{walletState.id}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div>
            <h4>Status</h4>
            <span className="font-bold text-[18px]">Active</span>
          </div>
          <div>
            <h4>Creation date</h4>
            <span className="font-bold text-[18px]">
              {new Date(walletState.createdAt).toLocaleDateString("es-AR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
              })}
            </span>
          </div>
          <div>
            <h4>Category</h4>
            <span className="font-bold text-[18px]">Standard</span>
          </div>
        </div>
      </div>
      <div>
        <Transfer />
      </div>
      {showModal ? (
        <CreateWalletModal
          showModal={showModal}
          setShowModal={setShowModal}
          createNewWallet={createNewWallet}
        />
      ) : null}
    </section>
  )
}
