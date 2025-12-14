import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Calendar, Users, Download, CheckCircle, AlertCircle, Clock, MapPin } from "lucide-react";
import GlitchTitle from "@/components/GlitchTitle";
import WorkshopBookingModal from "@/components/WorkshopBookingModal";

export default function Workshops() {
  const [activeTab, setActiveTab] = useState<"public" | "ndis">("public");
  const [selectedWorkshop, setSelectedWorkshop] = useState<{ id: string; title: string; price: number } | null>(null);

  const { data: workshops, isLoading, error } = trpc.workshops.list.useQuery();

  if (error) {
    console.error("Workshops query error:", error);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center">
          <GlitchTitle className="text-4xl sm:text-5xl font-bold mb-4">
            Workshops & Creative Programs in Brisbane
          </GlitchTitle>
          <p className="text-xl text-gray-600 mb-8">
            For individuals, NDIS participants, schools, councils and community groups.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              onClick={() => setActiveTab("public")}
              variant={activeTab === "public" ? "default" : "outline"}
            >
              View Public Workshops
            </Button>
            <Button
              size="lg"
              onClick={() => setActiveTab("ndis")}
              variant={activeTab === "ndis" ? "default" : "outline"}
            >
              NDIS, Councils & Schools
            </Button>
          </div>
        </div>
      </section>

      {/* Public Workshops Tab */}
      {activeTab === "public" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12">Public Workshops</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">Loading workshops...</p>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-600 mb-2">Error loading workshops</p>
                  <p className="text-gray-500 text-sm">{error.message}</p>
                </div>
              ) : workshops && workshops.length > 0 ? (
                workshops.map((workshop) => (
                  <div key={workshop.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                      {workshop.imageUrl ? (
                        <img
                          src={workshop.imageUrl}
                          alt={workshop.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <p className="text-gray-500">[Workshop image]</p>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
                      <div className="space-y-2 text-sm text-gray-600 mb-6">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>2 hours</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Max 23 participants</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>B.Y.O. at 2-4 Edmundstone Street, West End</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">All materials provided. Participants take home their creation.</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold">${workshop.price}</span>
                          <p className="text-xs text-gray-500">or $30 for a pair</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => setSelectedWorkshop({ id: workshop.id, title: workshop.title, price: parseInt(workshop.price as string) || 15 })}
                        >
                          Book / Enquire
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500">No workshops available at the moment</p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* NDIS Tab */}
      {activeTab === "ndis" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* NDIS Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">NDIS & Community Access Programs</h2>
              <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Services for NDIS Participants</h3>
                  <p className="text-gray-700 mb-4">
                    Scale Breakers provides accessible creative workshops for both self-managed and plan-managed NDIS participants. Our programs support goals including social participation, skill development, confidence building, and community access.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Key Accessibility Features:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Pre-visit planning and communication support</li>
                      <li>Visual supports and clear instructions</li>
                      <li>Sensory-aware workshop setup</li>
                      <li>Safety-first approach with trained facilitators</li>
                      <li>Flexible pacing and individual support</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Councils & Schools Programs</h3>
                  <p className="text-gray-700 mb-4">
                    We work with local councils, schools, and community organizations to deliver youth engagement programs, public art initiatives, and collaborative projects.
                  </p>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">Program Types:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Youth engagement and skill-building workshops</li>
                      <li>Public art and mural programs</li>
                      <li>Safe street art and co-design projects</li>
                      <li>Community collaboration initiatives</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                  <p className="text-gray-800 font-semibold mb-2">Private Sessions Only</p>
                  <p className="text-gray-700 mb-4">
                    All NDIS and council programs are delivered as private sessions to ensure appropriate support and safety. Contact us to discuss your needs and arrange a custom booking.
                  </p>
                  <Link href="/contact">
                    <Button size="lg">
                      Contact Us to Arrange a Session
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Credentials Section */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Credentials & Safety</h2>
              <div className="bg-white rounded-lg p-8 border border-gray-200 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Safety & Compliance
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>✓ Working With Children Check (WWCC)</li>
                    <li>✓ Police Check</li>
                    <li>✓ ABN: 12 345 678 901</li>
                    <li>✓ Accessibility best practices and training</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Download Documents</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="/NDIS_Quickstart_Service_Descriptor(1).pdf"
                      download
                      className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">Service Descriptor</p>
                        <p className="text-xs text-gray-500">PDF</p>
                      </div>
                    </a>
                    <a
                      href="/NDIS_Short_Service_Agreement.pdf"
                      download
                      className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">Service Agreement</p>
                        <p className="text-xs text-gray-500">PDF</p>
                      </div>
                    </a>
                    <a
                      href="/NDIS_Invoice_Template_PlanManaged.pdf"
                      download
                      className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">Invoice Template</p>
                        <p className="text-xs text-gray-500">PDF</p>
                      </div>
                    </a>
                    <a
                      href="/ABN_Details.pdf"
                      download
                      className="flex items-center gap-2 p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                    >
                      <Download className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-sm">ABN Details</p>
                        <p className="text-xs text-gray-500">PDF</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 border border-gray-200 italic">
                  <p className="text-gray-700 mb-3">
                    "The workshop was amazing! I learned so much about street art and felt really supported throughout. Can't wait to do another one."
                  </p>
                  <p className="font-semibold text-gray-900">— Alex, Workshop Participant</p>
                </div>
                <div className="bg-white rounded-lg p-6 border border-gray-200 italic">
                  <p className="text-gray-700 mb-3">
                    "Scale Breakers brought our community together. The mural project was inclusive, well-organized, and created something we're all proud of."
                  </p>
                  <p className="font-semibold text-gray-900">— Community Coordinator</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {selectedWorkshop && (
        <WorkshopBookingModal
          isOpen={!!selectedWorkshop}
          onClose={() => setSelectedWorkshop(null)}
          workshopId={selectedWorkshop.id}
          workshopTitle={selectedWorkshop.title}
          workshopPrice={selectedWorkshop.price}
        />
      )}
    </div>
  );
}
