import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const SocialMedia = () => {
	return (
		<div className="app__social">
			<a href="https://twitter.com/bbjaffer" target="_blank" rel="noreferrer">
				<div>
					<BsTwitter />
				</div>
			</a>
			<a
				href="https://www.linkedin.com/in/jaffer-sunny"
				target="_blank"
				rel="noreferrer">
				<div>
					<FaLinkedinIn />
				</div>
			</a>
			<a href="https://github.com/jaffasunny" target="_blank" rel="noreferrer">
				<div>
					<FaGithub />
				</div>
			</a>
		</div>
	);
};

export default SocialMedia;
