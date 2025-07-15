"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FAQ_ITEMS } from "@/lib/data"
import { useFaqs } from "@/hooks/useFaqs";

export function FAQSection() {
  const { faqs, isLoading, error } = useFaqs();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-beige/30"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-chocolate mb-4">Frequently Asked Questions</h3>
          <p className="text-lg text-chocolate/70 max-w-2xl mx-auto">
            Everything you need to know about our bakery and products.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          {isLoading ? (
            <div className="text-chocolate text-center py-8">Loading FAQs...</div>
          ) : error ? (
            <div className="text-red-600 text-center py-8">Failed to load FAQs.</div>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {(faqs || []).map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <AccordionItem value={item.id}>
                    <AccordionTrigger className="text-chocolate hover:text-caramel">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-chocolate/70">{item.answer}</AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          )}
        </motion.div>
      </div>
    </motion.section>
  )
}
