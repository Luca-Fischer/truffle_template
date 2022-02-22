App = {
    loading: false,
    contracts: {},

    load: async () => {
        console.log("Load section") 
        await App.loadWeb3()
        await App.loadAccount()
        await App.loadContract()
        await App.render()
    },

    loadWeb3: async () => {
        if (typeof web3 !== 'undefined') {
            App.web3Provider = web3.currentProvider
            web3 = new Web3(web3.currentProvider)
          } else {
            window.alert("Please connect to Metamask.")
          }
          // Modern dapp browsers...
          if (window.ethereum) {
            window.web3 = new Web3(ethereum)
            try {
              // Request account access if needed
              await ethereum.enable()
              // Acccounts now exposed
              web3.eth.sendTransaction({/* ... */})
            } catch (error) {
              // User denied account access...
            }
          }
          // Legacy dapp browsers...
          else if (window.web3) {
            App.web3Provider = web3.currentProvider
            window.web3 = new Web3(web3.currentProvider)
            // Acccounts always exposed
            web3.eth.sendTransaction({/* ... */})
          }
          // Non-dapp browsers...
          else {
            console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
          }
    },

    loadAccount: async () => {
        App.account =  web3.eth.accounts[0]
        web3.eth.defaultAccount=web3.eth.accounts[0]
    },

    loadContract: async () => {
        const FILENAME = await $.getJSON('{FILENAME}.json')
        App.contracts.FILENAME = TruffleContract(FILENAME)
        App.contracts.FILENAME.setProvider(App.web3Provider)
        App.FILENAME = await App.contracts.FILENAME.deployed()
    },

    render: async () => {
        if(App.loading) {
            return
        }
        
        App.loading = true

        await App.renderContent()

        App.loading = false
    },

    renderContent: async () => {
        
    },

    FUNCTIONNAME: async () => {
        App.loading = true
        
        window.location.reload()
    }


}

$(() => {
    $(window).load(() => {
        console.log("window is loading...")
        App.load()
    })
})