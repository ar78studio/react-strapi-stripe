import React from 'react';

import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './styles.module.css';
import { ChevronArrow } from '../../assets/index';

const AccordionItem = ({ header, ...rest }) => (
	<Item
		{...rest}
		header={
			<>
				{header}
				<img className={styles.chevron} src={ChevronArrow} alt='Chevron Down' />
			</>
		}
		className={styles.item}
		buttonProps={{
			className: ({ isEnter }) => `${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
		}}
		contentProps={{ className: styles.itemContent }}
		panelProps={{ className: styles.itemPanel }}
	/>
);

export default function AccordionTabs() {
	return (
		<>
			<Accordion transition transitionTimeout={200}>
				<AccordionItem header='Why should I choose this safety app and not others? Can you really assure me total privacy?' initialEntered>
					Because you can control what calls to answer, block unwanted callers, keep personal data private, avoid spam and scam
				</AccordionItem>
				<AccordionItem header='Do I need a SIM card or current contract to use this safety app?'>
					Yes, but that information will stay safe. You won't have to give away your personal number any more.
				</AccordionItem>
				<AccordionItem header='How much does it cost to use the VIP safety first service?'>
					A monthly subscription of just £9 a month including your new number and unlimited calls/messages! No contract, cancel anytime...
				</AccordionItem>
				<AccordionItem header='What happens if I need to change my VIP number?'>
					If your VIP number becomes compromised, we can change it for you to remove source of harassment by phone/messaging
				</AccordionItem>
				<AccordionItem header='What happens if I need support?'>Contact Us Here!</AccordionItem>
				<AccordionItem header='Can I trust the App?'>The VIP / conXhub App is certified by Apple and Android, completely ad-free and updated regularly</AccordionItem>
				<AccordionItem header='Do I need to sign up to a contract?'>No contract required – cancel anytime you want with no penalties</AccordionItem>
			</Accordion>
		</>
	);
}
