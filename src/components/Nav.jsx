const hrefs = {
    Home: '/',
    Users: '/users',
    Epics: '/epics',
    Features: '/features',
    Stories: '/stories',
};

export default function Nav() {
    return (
        <nav>
            <ul>
                {Object.entries(hrefs).map(([title, href]) => <li><a href={href}>{title}</a></li>)}
            </ul>
        </nav>
    );
}
