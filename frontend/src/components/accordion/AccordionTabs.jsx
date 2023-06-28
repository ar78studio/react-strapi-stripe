import React from 'react';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from '../accordion/styles.module.css';

import { ChevronArrow } from '../../assets/index';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const AccordionTabs = ({ setSelectedPage }) => {
	const { t, i18n } = useTranslation();

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
				className: ({ isEnter }) => `bg-white ${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
			}}
			contentProps={{ className: styles.itemContent }}
			panelProps={{ className: styles.itemPanel }}
		/>
	);

	return (
		<Accordion transition transitionTimeout={200}>
			{/* Why should I choose this safety app and not others? Can you really assure me total privacy? */}
			<AccordionItem className=' font-light leading-4 text-xs lg:text-base ' header={<Trans i18nKey='faqAccordion.q1'></Trans>}>
				{/* Because you can control what calls to answer, block unwanted callers, keep personal data private, avoid spam and scam */}
				<Trans i18nKey='faqAccordion.a1'></Trans>
			</AccordionItem>
			{/* Do I need a SIM card or current contract to use this safety app? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q2'></Trans>}>
				{/* Yes, but that information will stay safe. You won't have to give away your personal number any more. */}
				<Trans i18nKey='faqAccordion.a2'></Trans>
			</AccordionItem>
			{/* How much does it cost to use the VIP safety first service? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q3'></Trans>}>
				{/* A monthly subscription of just £9 a month including your new number and unlimited calls/messages! No contract, cancel anytime... */}
				<Trans i18nKey='faqAccordion.a3'></Trans>
			</AccordionItem>
			{/* What happens if I need to change my VIP number? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q4'></Trans>}>
				{/* If your VIP number becomes compromised, we can change it for you to remove source of harassment by phone/messaging */}
				<Trans i18nKey='faqAccordion.a4'></Trans>
			</AccordionItem>
			{/* What happens if I need support? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q5'></Trans>}>
				<a className='hover:text-[#f20f76] hover:font-semibold' href='https://billing.conxhub.com/submitticket.php?step=2&deptid=4'>
					{/* Contact Us Here! */}
					<Trans i18nKey='faqAccordion.a5'></Trans>
				</a>
			</AccordionItem>
			{/* Can I trust the App? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q6'></Trans>}>
				{/* The VIP / conXhub App is certified by Apple and Android, completely ad-free and updated regularly */}
				<Trans i18nKey='faqAccordion.a6'></Trans>
			</AccordionItem>
			{/* Do I need to sign up to a contract? */}
			<AccordionItem className=' font-light leading-4 lg:text-base ' header={<Trans i18nKey='faqAccordion.q7'></Trans>}>
				{/* No contract required – cancel anytime you want with no penalties */}
				<Trans i18nKey='faqAccordion.a7'></Trans>
			</AccordionItem>
		</Accordion>
	);
};

export default AccordionTabs;
