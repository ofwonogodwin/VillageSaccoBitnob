import axios from 'axios'

const BITNOB_API_BASE = 'https://api.bitnob.co'
const API_KEY = process.env.BITNOB_API_KEY

interface BitnobResponse<T> {
  success: boolean
  data: T
  message?: string
}

interface WalletBalance {
  currency: string
  balance: number
  available_balance: number
}

interface VirtualCardData {
  id: string
  masked_pan: string
  expiry_month: string
  expiry_year: string
  cvv: string
  balance: number
  currency: string
  status: string
}

interface TransactionData {
  id: string
  amount: number
  currency: string
  status: string
  hash: string
  reference: string
}

class BitnobService {
  private headers = {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }

  async getWalletBalance(walletId: string): Promise<WalletBalance> {
    try {
      const response = await axios.get(`${BITNOB_API_BASE}/v1/wallets/${walletId}/balance`, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching wallet balance:', error)
      throw new Error('Failed to fetch wallet balance')
    }
  }

  async sendUSDT(data: {
    amount: number
    recipient_address: string
    description?: string
  }): Promise<TransactionData> {
    try {
      const response = await axios.post(`${BITNOB_API_BASE}/v1/transactions/send`, {
        ...data,
        currency: 'USDT'
      }, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error sending USDT:', error)
      throw new Error('Failed to send USDT')
    }
  }

  async receiveUSDT(data: {
    amount: number
    sender_address: string
    description?: string
  }): Promise<TransactionData> {
    try {
      const response = await axios.post(`${BITNOB_API_BASE}/v1/transactions/receive`, {
        ...data,
        currency: 'USDT'
      }, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error receiving USDT:', error)
      throw new Error('Failed to receive USDT')
    }
  }

  async walletToWalletTransfer(data: {
    from_wallet_id: string
    to_wallet_id: string
    amount: number
    description?: string
  }): Promise<TransactionData> {
    try {
      const response = await axios.post(`${BITNOB_API_BASE}/v1/wallets/transfer`, data, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error in wallet transfer:', error)
      throw new Error('Failed to transfer between wallets')
    }
  }

  async createVirtualCard(data: {
    card_type: string
    currency: string
    label?: string
  }): Promise<VirtualCardData> {
    try {
      const response = await axios.post(`${BITNOB_API_BASE}/v1/virtual-cards/create`, data, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error creating virtual card:', error)
      throw new Error('Failed to create virtual card')
    }
  }

  async fundVirtualCard(data: {
    card_id: string
    amount: number
    currency: string
  }): Promise<any> {
    try {
      const response = await axios.post(`${BITNOB_API_BASE}/v1/virtual-cards/fund`, data, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error funding virtual card:', error)
      throw new Error('Failed to fund virtual card')
    }
  }

  async getVirtualCardBalance(cardId: string): Promise<any> {
    try {
      const response = await axios.get(`${BITNOB_API_BASE}/v1/virtual-cards/${cardId}/balance`, {
        headers: this.headers
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching card balance:', error)
      throw new Error('Failed to fetch card balance')
    }
  }
}

export const bitnobService = new BitnobService()
export type { WalletBalance, VirtualCardData, TransactionData }
