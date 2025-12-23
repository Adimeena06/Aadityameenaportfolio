import { motion } from "framer-motion";
import { Github, Linkedin, Mail, MessageSquare, Send, Phone, MapPin } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com", color: "hover:text-foreground" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com", color: "hover:text-blue-400" },
  { icon: Mail, label: "Email", href: "mailto:adityameenabusiness@email.com", color: "hover:text-accent" },
  { icon: Phone, label: "Phone", href: "tel:+917668952567", color: "hover:text-green-400" },
];

export const ContactSection = () => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setMessage("");
    }, 2000);
  };

  return (
    <section className="py-20 px-4 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.span
          className="inline-block font-future text-xs text-muted-foreground mb-4 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          [ COMMUNICATION HUB ]
        </motion.span>
        <h2 className="font-pixel text-xl sm:text-2xl text-foreground mb-4">
          SEND A <span className="text-accent neon-text-accent">MESSAGE</span>
        </h2>
        <p className="font-future text-muted-foreground max-w-md mx-auto">
          Ready to start a new quest together? Let's build something amazing in Web3 & AI
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="game-card mb-8"
        >
          <div className="flex flex-wrap justify-center gap-6 text-sm font-future text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span>Greater Noida, India</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-primary" />
              <span>adityameenabusiness@email.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              <span>+91-7668952567</span>
            </div>
          </div>
        </motion.div>

        {/* Message input */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="game-card mb-8"
        >
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <MessageSquare size={20} className="text-primary" />
            <span className="font-future text-sm">New Message</span>
          </div>
          
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message here..."
              className="w-full h-32 bg-muted/30 border border-border rounded-lg p-4 font-future text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all"
            />
            
            <motion.button
              onClick={handleSend}
              disabled={isSending || !message.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-future text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  ⚡
                </motion.div>
              ) : (
                <>
                  <Send size={16} />
                  <span>Send</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, type: "spring" }}
              whileHover={{ scale: 1.2, y: -5 }}
              className={`p-4 bg-muted/30 border border-border rounded-lg text-muted-foreground ${social.color} transition-colors`}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="font-future text-xs text-muted-foreground">
            © 2024 Aaditya Meena. All quests reserved.
          </p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-pixel text-xs text-primary mt-2"
          >
            GAME OVER? NEVER.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
