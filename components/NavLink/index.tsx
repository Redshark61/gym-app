import { useRouter } from "next/router";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
	children: ReactNode;
	href: string;
	exact?: boolean;
	end?: boolean;
	target?: string;
	className?: string;
}

export function NavLink({ href, exact, children, end, ...props }: Props) {
	const { pathname } = useRouter();
	let isActive: boolean = false;

	if (exact) {
		isActive = pathname === href;
	} else if (end) {
		isActive = pathname.endsWith(href);
	} else {
		isActive = pathname.startsWith(href);
	}

	if (isActive) {
		props.className += " active";
	}

	return (
		<Link href={href}>
			<a {...props}>{children}</a>
		</Link>
	);
}
