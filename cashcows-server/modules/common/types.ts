import { 
  AlertTypes, 
  AlertLayouts, 
  BadgeTypes, 
  BadgeLayouts,
  PixelButtonTypes,
  PixelButtonSizes
} from './enums';

export type Task = () => Promise<void> | void;
export type QueueState = {
  tasks: ReadonlyArray<Task>
  running: boolean
};
export type TaskState = QueueState & {
  purge: () => void,
  queue: (task: Task) => void
};

export type RankedData = {
  edition: number,
  characterId: string,
  score: number,
  rank: number,
  images: string[],
  attributes: Record<string, {
    value: string|number,
    score: number,
    occurances: number
  }>,
  rates: Record<string, {
    rate: string,
    proof: string
  }>,
  loot: Record<string, Record<string, {
    price: string,
    proof: string
  }>>
};

export type FloorItem = {
  market: {
    floorAsk: {
      id: string,
      maker: string, 
      price: { 
        amount: {
          decimal: number,
          native: number,
          raw: string,
          usd: number
        },
        currency: { 
          contract: string,
          decimals: number
          name: string,
          symbol: string
        }
      },
      source: { 
        domain: string,
        icon: string, 
        id: string,
        name: string, 
        url: string,
      },
      validFrom: number,
      validUntil: number
    }
  },
  token: {
    collection: {
      id: string,
      image: string,
      name: string,
      slug: string
    },
    contract: string,
    description: string,
    image: string,
    isFlagged: boolean,
    kind: string,
    lastBuy: {
      timestamp: number,
      value: number 
    },
    lastFlagUpdate: string,
    lastSell: {
      timestamp: number,
      value: number 
    },
    media: string|null,
    name: string,
    owner: string,
    rarity: number,
    rarityRank: number,
    tokenId: string
  }
};

export type PanelProps = {
  main: {
    opened: boolean,
    toggle: Function
  },
  user: {
    opened: boolean,
    toggle: Function
  }
};

export type PanelFormProps = {
  mintAmount: number,
  totalPrice: number,
  addAmount: Function,
  lessAmount: Function,
  buyItems: Function
};

export type PanelSessionProps = {
  crews: RankedData[],
  loading: boolean
};

export type PanelPageProps = {
  panel: PanelProps,
  form: PanelFormProps,
  session: PanelSessionProps
};

export type HeadingProps = {
  level?: string|number,
  font?: string,
  color?: string,
  size?: string,
  className?: string,
  children?: React.ReactNode
};

export type AlertProps = {
  type?: AlertTypes,
  layout?: AlertLayouts,
  className?: string,
  children: React.ReactNode
};

export type BadgeProps = {
  type?: BadgeTypes,
  layout?: BadgeLayouts,
  className?: string,
  children: React.ReactNode
};

export type PixelButtonProps = Record<string, any> & {
  type?: PixelButtonTypes,
  size?: PixelButtonSizes,
  font?: string,
  className?: string,
  href?: string,
  children: React.ReactNode
};

export type ModalProps = {
  opened: boolean,
  body: Function,
  open: Function, 
  close: Function,
  style: Function,
  title: Function
};