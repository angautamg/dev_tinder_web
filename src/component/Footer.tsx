const Footer = () => {
    return (
        <footer className="footer sm:footer-horizontal footer-center glass-card border-b border-white/20 px-6 text-base-content p-4 fixed bottom-0 w-full">
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
            </aside>
        </footer>
    );
}
export default Footer;