const Footer = () => {
    return (
        <footer data-theme="nord" className="footer sm:footer-horizontal footer-center border-b px-6 text-base-content p-4 fixed bottom-0 w-full">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by Feedly Dating App</p>
            </aside>
        </footer>
    );
}
export default Footer;