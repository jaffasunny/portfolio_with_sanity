import React from "react";
import { BsTwitter } from "react-icons/bs";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

const SocialMedia = () => {
	return (
		<div className="app__social">
			<a href="https://twitter.com/bbjaffer" target="_blank">
				<div>
					<BsTwitter />
				</div>
			</a>
			<a href="https://www.linkedin.com/in/jaffer-sunny" target="_blank">
				<div>
					<FaLinkedinIn />
				</div>
			</a>
			<a href="https://github.com/jaffasunny" target="_blank">
				<div>
					<FaGithub />
				</div>
			</a>
		</div>
	);
};

export default SocialMedia;
