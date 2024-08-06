// @ts-ignore
import React from "react";
// @ts-ignore
import { useMemo, useState } from 'react';

interface WalletBalance {
    currency: string;
    amount: number;
    blockchain: string
}

interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface BoxProps {
    children?: React.ReactNode;
}

interface Props extends BoxProps {
}

const WalletPage: React.FC<Props> = (props: Props) => {
    const { children, ...rest } = props;
    const [balances, setBalances] = useState<WalletBalance[]>([]);
    const [prices, setPrices] = useState({});

    const getPriority = (blockchain: any): number => {
        switch (blockchain) {
            case 'Osmosis':
                return 100
            case 'Ethereum':
                return 50
            case 'Arbitrum':
                return 30
            case 'Zilliqa':
                return 20
            case 'Neo':
                return 20
            default:
                return -99
        }
    }

    const sortedBalances = useMemo(() => {
        return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);
            if (balancePriority > -99) {
                if (balance.amount >= 0) {
                    return true;
                }
            }
            return false
        }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);
            if (leftPriority > rightPriority) {
                return -1;
            } else if (rightPriority > leftPriority) {
                return 1;
            }
        });
    }, [balances, getPriority]);

    const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
        return {
            ...balance,
            formatted: balance.amount.toFixed()
        }
    })

    const rows = formattedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        return (
            <WalletRow
                key={index}
                currency={balance.currency}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={balance.formatted}
            />
        )
    })

    return (
        <div {...rest}>
            {rows}
        </div>
    )
}

interface WalletRowProps {
    currency: string;
    amount: number;
    usdValue: number;
    formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ currency, amount, usdValue, formattedAmount }) => {
    return (
        <tr>
            <td>{currency}</td>
            <td>{amount}</td>
            <td>{formattedAmount}</td>
            <td>{usdValue}</td>
        </tr>
    );
};