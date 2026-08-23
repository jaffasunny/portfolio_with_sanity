import { useState, useEffect, ChangeEvent } from "react";

import { SocialMedia } from "../../components";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import { trackFetch } from "../../loadingStore";
import type { ContactFormData, ContactSection } from "../../types/sanity";

const defaultSectionHeading = "Let's talk.";
const defaultBlurb =
	"Have a project or need help? Fill out the form, and I'll get back to you soon.";
const defaultEmail = "jaffer.sunny125@gmail.com";
const defaultPhone = "+971544839963";

const Footer = () => {
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		message: "",
	});

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [submitError, setSubmitError] = useState(false);
	const [fieldErrors, setFieldErrors] = useState<Partial<ContactFormData>>({});
	const [section, setSection] = useState<ContactSection | null>(null);
	const { name, email, message } = formData;

	useEffect(() => {
		const query = '*[_type=="contactSection"][0]';
		trackFetch(client.fetch<ContactSection>(query)).then((data) => setSection(data));
	}, []);

	useEffect(() => {
		if (!isFormSubmitted) return;

		const timer = setTimeout(() => {
			setIsFormSubmitted(false);
			setFormData({ name: "", email: "", message: "" });
			setFieldErrors({});
		}, 5000);

		return () => clearTimeout(timer);
	}, [isFormSubmitted]);

	const sectionHeading = section?.sectionHeading ?? defaultSectionHeading;
	const blurb = section?.blurb ?? defaultBlurb;
	const contactEmail = section?.email ?? defaultEmail;
	const contactPhone = section?.phone ?? defaultPhone;
	const socialLinks = section?.socialLinks;

	const handleChangeInput = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;

		setFormData({ ...formData, [name]: value });
		setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
	};

	const validate = () => {
		const errors: Partial<ContactFormData> = {};

		if (!name.trim()) errors.name = "Name is required.";

		if (!email.trim()) {
			errors.email = "Email is required.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
			errors.email = "Enter a valid email address.";
		}

		if (!message.trim()) errors.message = "Message is required.";

		setFieldErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSubmit = () => {
		if (!validate()) return;

		setLoading(true);
		setSubmitError(false);

		const contact = {
			_type: "contact",
			name,
			email,
			message,
		};

		client
			.create(contact)
			.then(() => {
				setLoading(false);
				setIsFormSubmitted(true);
			})
			.catch((error) => {
				console.error("Failed to submit contact form:", error);
				setLoading(false);
				setSubmitError(true);
			});
	};

	return (
		<>
			<div className="flex flex-col gap-8 md:flex-row md:gap-16">
				<div className="flex flex-1 flex-col justify-between">
					<h2 className="head-text">{sectionHeading}</h2>
					<p className="p-text mt-4 max-w-[320px]">{blurb}</p>

					<div className="mt-8 flex flex-col items-start gap-2">
						<a
							href={`mailto:${contactEmail}`}
							className="p-text font-semibold no-underline hover:text-ink">
							{contactEmail}
						</a>
						<a
							href={`tel:${contactPhone}`}
							className="p-text font-semibold no-underline hover:text-ink">
							{contactPhone}
						</a>
					</div>

					<div className="mt-8">
						<SocialMedia links={socialLinks} />
					</div>
				</div>

				<div className="flex-1">
					{!isFormSubmitted ? (
						<div className="dark-card flex w-full flex-col gap-3 p-6">
							<div>
								<input
									type="text"
									className={`w-full rounded-lg border bg-white/10 p-3 text-sm text-white placeholder:text-white/40 outline-none ${
										fieldErrors.name ? "border-red-400" : "border-transparent"
									}`}
									placeholder="Name"
									name="name"
									value={name}
									onChange={handleChangeInput}
								/>
								{fieldErrors.name && (
									<p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
								)}
							</div>

							<div>
								<input
									type="email"
									className={`w-full rounded-lg border bg-white/10 p-3 text-sm text-white placeholder:text-white/40 outline-none ${
										fieldErrors.email ? "border-red-400" : "border-transparent"
									}`}
									placeholder="Email"
									name="email"
									value={email}
									onChange={handleChangeInput}
								/>
								{fieldErrors.email && (
									<p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
								)}
							</div>

							<div>
								<textarea
									className={`h-[140px] w-full resize-none rounded-lg border bg-white/10 p-3 text-sm text-white placeholder:text-white/40 outline-none ${
										fieldErrors.message ? "border-red-400" : "border-transparent"
									}`}
									placeholder="Message"
									name="message"
									value={message}
									onChange={handleChangeInput}
								/>
								{fieldErrors.message && (
									<p className="mt-1 text-xs text-red-400">{fieldErrors.message}</p>
								)}
							</div>

							<button
								type="button"
								className="mt-2 w-full cursor-pointer rounded-lg border-none bg-white py-3 text-sm font-semibold text-ink outline-none transition-opacity hover:opacity-90"
								onClick={handleSubmit}>
								{loading ? "Sending..." : "Send"}
							</button>

							{submitError && (
								<p className="text-xs text-red-400">
									Something went wrong sending your message. Please try again or
									email me directly.
								</p>
							)}
						</div>
					) : (
						<div className="dark-card flex h-full items-center justify-center p-6 text-center">
							<h3 className="text-xl font-bold text-white">
								Thank you for getting in touch!
							</h3>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default AppWrap(MotionWrap(Footer), "contact", "app__primarybg");
