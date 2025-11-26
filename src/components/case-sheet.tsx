import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  User,
  FileText,
  MessageCircle,
  Send,
  Download,
  Image as ImageIcon,
  ArrowLeft,
  RefreshCw,
  Brain,
  HelpCircle,
  Stethoscope,
  GraduationCap,
  Target,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Label } from "./ui/label";

interface CaseStudy {
  id: string;
  title: string;
  topic: string;
  caseNumber: string;
  dateOfExamination: string;
  examinerName: string;
  generationMode: string;
  patient: {
    id: string;
    name: string;
    age: number;
    gender: string;
    occupation: string;
    chiefComplaint: string;
  };
  history: {
    presentingComplaint: string;
    pastOcularHistory: string;
    pastMedicalHistory: string;
    familyHistory: string;
    medications: string;
    allergies: string;
    socialHistory: string;
  };
  examination: {
    visualAcuity: {
      distanceOD: string;
      distanceOS: string;
      nearOD: string;
      nearOS: string;
    };
    refraction: {
      dryOD: string;
      dryOS: string;
      wetOD: string;
      wetOS: string;
    };
    additionalTests: {
      colorVision: string;
      contrastSensitivity: string;
      pupilsOD: string;
      pupilsOS: string;
      eom: string;
      coverTest: string;
      npc: string;
      accommodation: string;
    };
    slitLamp: {
      lidsLashes: string;
      conjunctiva: string;
      cornea: string;
      anteriorChamber: string;
      iris: string;
      lens: string;
    };
    iop: {
      od: string;
      os: string;
      method: string;
      time: string;
    };
    fundus: {
      method: string;
      discOD: string;
      discOS: string;
      vesselsOD: string;
      vesselsOS: string;
      maculaOD: string;
      maculaOS: string;
      peripheryOD: string;
      peripheryOS: string;
    };
    visualFields: string;
  };
  diagnosis: {
    primary: string;
    secondary: string[];
    differentialDiagnosis: string[];
  };
  management: {
    immediate: string[];
    prescription: string;
    patientEducation: string[];
    referrals: string;
    followUp: string;
  };
  learningPoints: string[];
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface CaseGenerationConfig {
  topic: string;
  mode: string;
  difficulty: string;
  focus: string;
}

export function CaseStudies() {
  const [showConfig, setShowConfig] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCase, setGeneratedCase] = useState<CaseStudy | null>(null);
  const [chatMode, setChatMode] = useState<"learning" | "quiz">("learning");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const caseSheetRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [config, setConfig] = useState<CaseGenerationConfig>({
    topic: "",
    mode: "comprehensive",
    difficulty: "intermediate",
    focus: "general",
  });

  const generateCase = () => {
    if (!config.topic.trim()) return;

    setIsGenerating(true);

    setTimeout(() => {
      const patientAge = Math.floor(Math.random() * 60) + 20;
      const patientGender = Math.random() > 0.5 ? "Male" : "Female";
      const caseId = Date.now().toString();

      const mockCase: CaseStudy = {
        id: caseId,
        title: `${config.topic} Clinical Case`,
        topic: config.topic,
        caseNumber: `OPT-${caseId.slice(-6)}`,
        dateOfExamination: new Date().toLocaleDateString("en-US", { 
          year: "numeric", 
          month: "long", 
          day: "numeric" 
        }),
        examinerName: "Dr. Focus AI",
        generationMode: config.mode,
        patient: {
          id: `PT-${caseId.slice(-8).toUpperCase()}`,
          name: `Patient ${caseId.slice(-4)}`,
          age: patientAge,
          gender: patientGender,
          occupation: "Office Worker",
          chiefComplaint: `Experiencing visual difficulties related to ${config.topic}`,
        },
        history: {
          presentingComplaint: `Patient presents with progressive symptoms consistent with ${config.topic}. The symptoms began approximately 3-4 months ago and have gradually worsened. Patient reports increased difficulty with visual tasks, particularly during evening hours. No trauma or sudden onset noted.`,
          pastOcularHistory: "No previous eye surgeries. Last comprehensive eye examination was 2 years ago. No history of amblyopia, strabismus, or other ocular conditions. Wears corrective lenses occasionally.",
          pastMedicalHistory: "Generally healthy. No diabetes, hypertension, or autoimmune conditions. No history of cardiovascular disease. No known neurological conditions.",
          familyHistory: "Mother has presbyopia and mild cataracts (age-related). Father has myopia. No family history of glaucoma, macular degeneration, or retinal diseases.",
          medications: "None currently taking. No history of corticosteroid use or other medications affecting vision.",
          allergies: "No known drug allergies. No seasonal allergies reported.",
          socialHistory: "Non-smoker. Occasional alcohol consumption (social). Works at computer for 8+ hours daily. Good sleep hygiene. Regular exercise routine.",
        },
        examination: {
          visualAcuity: {
            distanceOD: "20/40",
            distanceOS: "20/40",
            nearOD: "20/30",
            nearOS: "20/30",
          },
          refraction: {
            dryOD: "-1.50 -0.75 x 180",
            dryOS: "-1.25 -0.50 x 175",
            wetOD: "-1.25 -0.75 x 180",
            wetOS: "-1.00 -0.50 x 175",
          },
          additionalTests: {
            colorVision: "Ishihara 15/15 plates OU - Normal",
            contrastSensitivity: "Pelli-Robson: 1.65 OU - Within normal limits",
            pupilsOD: "PERRLA 4mm → 2mm, no RAPD",
            pupilsOS: "PERRLA 4mm → 2mm, no RAPD",
            eom: "Full and smooth in all directions OU. No restrictions or pain.",
            coverTest: "Orthophoric at distance and near. No tropia or phoria detected.",
            npc: "8cm - Normal",
            accommodation: "OD: 10D, OS: 10D - Age appropriate",
          },
          slitLamp: {
            lidsLashes: "Lids and lashes: Normal position and structure OU. No blepharitis, chalazion, or hordeolum.",
            conjunctiva: "Bulbar and palpebral conjunctiva clear and quiet OU. No injection, follicles, or papillae.",
            cornea: "Clear and bright OU. Normal thickness and curvature. No infiltrates, scars, or edema. Descemet's membrane intact.",
            anteriorChamber: "Deep and quiet OU. Normal depth maintained. No cells or flare. Van Herick Grade 3-4.",
            iris: "Normal architecture and color OU. No neovascularization, atrophy, or synechiae. Crypts visible.",
            lens: "Clear OU. No cortical, nuclear, or posterior subcapsular opacities. Normal position.",
          },
          iop: {
            od: "15 mmHg",
            os: "14 mmHg",
            method: "Goldmann Applanation Tonometry",
            time: "10:30 AM",
          },
          fundus: {
            method: "Dilated fundoscopy (Tropicamide 1%, Phenylephrine 2.5%)",
            discOD: "Pink, well-defined margins. CDR 0.3. No pallor, swelling, or hemorrhage.",
            discOS: "Pink, well-defined margins. CDR 0.3. No pallor, swelling, or hemorrhage.",
            vesselsOD: "Normal caliber, course, and AV ratio (2:3). No tortuosity, sheathing, or crossing changes.",
            vesselsOS: "Normal caliber, course, and AV ratio (2:3). No tortuosity, sheathing, or crossing changes.",
            maculaOD: "Flat with intact foveal reflex. No drusen, hemorrhages, or exudates. Normal pigmentation.",
            maculaOS: "Flat with intact foveal reflex. No drusen, hemorrhages, or exudates. Normal pigmentation.",
            peripheryOD: "Attached retina 360°. No holes, tears, or lattice degeneration. Normal pigmentation.",
            peripheryOS: "Attached retina 360°. No holes, tears, or lattice degeneration. Normal pigmentation.",
          },
          visualFields: "Confrontation fields full to finger counting OU. No scotomas or defects detected.",
        },
        diagnosis: {
          primary: `${config.topic} (Primary diagnosis based on clinical presentation)`,
          secondary: [
            "Refractive error - Low myopia with astigmatism OU",
            "Computer Vision Syndrome - Contributing factor",
          ],
          differentialDiagnosis: [
            "Early presbyopia - ruled out based on accommodation testing",
            "Dry eye disease - no significant signs on examination",
            "Convergence insufficiency - NPC within normal limits",
          ],
        },
        management: {
          immediate: [
            "Prescribed corrective lenses: OD: -1.50 -0.75 x 180, OS: -1.25 -0.50 x 175",
            "Recommended anti-reflective coating for computer use",
            "Blue light filtering lenses suggested for digital device use",
          ],
          prescription: "Rx: OD: -1.50 -0.75 x 180 | OS: -1.25 -0.50 x 175 | Add: Plano | PD: 63mm",
          patientEducation: [
            "20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds",
            "Proper ergonomics and screen positioning (arm's length, eye level)",
            "Adequate lighting and reduce glare on screens",
            "Regular breaks from near work",
            "Importance of wearing prescribed correction consistently",
          ],
          referrals: "No referrals required at this time. Patient to return if symptoms worsen or new symptoms develop.",
          followUp: "Follow-up appointment in 6 months for routine examination and to assess adaptation to new prescription. Annual comprehensive eye examinations recommended.",
        },
        learningPoints: [
          `Understanding the clinical presentation and key features of ${config.topic}`,
          "Importance of comprehensive history taking in differential diagnosis",
          "Systematic approach to clinical examination",
          "Correlation between symptoms and examination findings",
          "Evidence-based management and patient-centered care",
        ],
      };

      setGeneratedCase(mockCase);
      setIsGenerating(false);
      setShowConfig(false);
      setChatMessages([
        {
          id: "1",
          role: "assistant",
          content: chatMode === "learning" 
            ? `I've generated a comprehensive case study on ${config.topic}. I'm here to help you understand this case better. Feel free to ask me any questions about the diagnosis, management, or clinical findings!`
            : `Case generated! I'm in Quiz Mode. I'll test your understanding of this ${config.topic} case. Ready for questions?`,
        },
      ]);
    }, 2000);
  };

  const downloadCaseAsImage = async () => {
    if (!caseSheetRef.current) return;

    setIsDownloading(true);

    try {
      const html2canvas = (await import("html2canvas")).default;
      const element = caseSheetRef.current;

      // Create a white background wrapper
      const wrapper = document.createElement("div");
      wrapper.style.backgroundColor = "#ffffff";
      wrapper.style.padding = "0";
      wrapper.style.width = element.offsetWidth + "px";
      
      const clone = element.cloneNode(true) as HTMLElement;
      clone.style.backgroundColor = "#ffffff";
      wrapper.appendChild(clone);
      
      document.body.appendChild(wrapper);
      wrapper.style.position = "fixed";
      wrapper.style.top = "-10000px";
      wrapper.style.left = "0";

      const canvas = await html2canvas(wrapper, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        width: element.offsetWidth,
        height: element.offsetHeight,
      });

      document.body.removeChild(wrapper);

      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `case-study-${generatedCase?.caseNumber || Date.now()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
        setIsDownloading(false);
      }, "image/jpeg", 0.95);
    } catch (error) {
      console.error("Error downloading case sheet:", error);
      alert("Failed to download. Please try again.");
      setIsDownloading(false);
    }
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: chatInput,
    };

    setChatMessages([...chatMessages, userMessage]);
    setChatInput("");

    setTimeout(() => {
      let aiResponse = "";
      
      if (chatMode === "quiz") {
        // Quiz mode responses
        if (chatMessages.length < 3) {
          aiResponse = `Great attempt! Let me help you understand this better. ${chatInput.toLowerCase().includes("diagnosis") ? "The diagnosis involves careful examination of all clinical findings. Key indicators include the patient's symptoms, examination results, and differential diagnosis considerations." : "Consider the complete clinical picture including history, examination findings, and the patient's overall presentation."}`;
        } else {
          aiResponse = `Question ${Math.floor(chatMessages.length / 2) + 1}: Based on the examination findings, what would be your next step in management? Think about immediate interventions and patient education.`;
        }
      } else {
        // Learning mode responses
        aiResponse = `Great question about ${generatedCase?.topic}! ${chatInput.toLowerCase().includes("diagnosis") ? "The diagnosis process involves systematic evaluation of symptoms, clinical signs, and test results. In this case, the key diagnostic features include the presenting complaint, examination findings, and ruling out differential diagnoses." : chatInput.toLowerCase().includes("treatment") || chatInput.toLowerCase().includes("management") ? "The management approach is comprehensive and patient-centered. It includes optical correction, patient education about the 20-20-20 rule, ergonomic adjustments, and regular follow-up to monitor progress." : chatInput.toLowerCase().includes("examination") ? "The examination follows a systematic approach: visual acuity, refraction, additional tests, slit lamp biomicroscopy, IOP measurement, and fundus examination. Each component provides crucial diagnostic information." : "This is an excellent point to explore. Consider how the history, examination findings, and diagnostic reasoning all connect to provide optimal patient care."}`;
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponse,
      };
      setChatMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Configuration Screen
  if (showConfig) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-purple-600 shadow-2xl shadow-blue-500/40 dark:shadow-blue-500/30 mb-4"
              >
                <Stethoscope className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-2xl md:text-3xl text-gray-900 dark:text-gray-100 mb-2">
                AI Case Generator
              </h2>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                Generate realistic clinical case studies for optometry practice
              </p>
            </div>

            <div className="space-y-5">
              <div>
                <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                  Topic or Condition *
                </Label>
                <Input
                  value={config.topic}
                  onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                  placeholder="E.g., Myopia, Glaucoma, Cataracts, Diabetic Retinopathy..."
                  className="h-12 text-base"
                  onKeyDown={(e) => e.key === "Enter" && generateCase()}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Generation Mode
                  </Label>
                  <Select
                    value={config.mode}
                    onValueChange={(value) => setConfig({ ...config, mode: value })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          Comprehensive
                        </div>
                      </SelectItem>
                      <SelectItem value="focused">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          Focused
                        </div>
                      </SelectItem>
                      <SelectItem value="complex">
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Complex
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Difficulty Level
                  </Label>
                  <Select
                    value={config.difficulty}
                    onValueChange={(value) => setConfig({ ...config, difficulty: value })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-gray-700 dark:text-gray-300 mb-2 block">
                    Clinical Focus
                  </Label>
                  <Select
                    value={config.focus}
                    onValueChange={(value) => setConfig({ ...config, focus: value })}
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Practice</SelectItem>
                      <SelectItem value="pediatric">Pediatric</SelectItem>
                      <SelectItem value="geriatric">Geriatric</SelectItem>
                      <SelectItem value="specialty">Specialty Care</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                onClick={generateCase}
                disabled={!config.topic.trim() || isGenerating}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-base"
              >
                {isGenerating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                    </motion.div>
                    Generating Case Study...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Case Study
                  </>
                )}
              </Button>

              <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800">
                <GraduationCap className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <strong className="text-blue-700 dark:text-blue-300">Interactive Learning:</strong> After generation, use Learning Mode for guided explanations or Quiz Mode to test your knowledge!
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (generatedCase) {
    return (
      <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-950">
        {/* Header */}
        <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 p-3 md:p-4 flex-shrink-0">
          <div className="flex items-center justify-between gap-2">
            <Button
              onClick={() => {
                setGeneratedCase(null);
                setShowConfig(true);
                setChatMessages([]);
              }}
              variant="ghost"
              size="sm"
              className="text-blue-600 dark:text-blue-400"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">New Case</span>
            </Button>
            <div className="flex items-center gap-2">
              <Button
                onClick={generateCase}
                variant="outline"
                size="sm"
                className="border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Regenerate</span>
              </Button>
              <Button
                onClick={downloadCaseAsImage}
                disabled={isDownloading}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Download className="h-4 w-4" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <ImageIcon className="h-4 w-4 md:mr-2" />
                    <span className="hidden md:inline">Download</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Case Sheet - Left Side */}
          <div className="flex-1 overflow-y-auto">
            <div className="w-full max-w-5xl mx-auto p-3 md:p-6">
              <div 
                ref={caseSheetRef}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border-2 border-gray-300 dark:border-gray-700 overflow-hidden"
              >
                {/* Header */}
                <div className="bg-blue-600 text-white p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <FileText className="h-8 w-8" />
                        <div>
                          <h1 className="text-2xl md:text-3xl">CLINICAL CASE RECORD</h1>
                          <p className="text-blue-100 text-sm mt-1">Optometry Department - Focus AI</p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <div className="mb-1"><strong>Case:</strong> {generatedCase.caseNumber}</div>
                      <div className="mb-1"><strong>Date:</strong> {generatedCase.dateOfExamination}</div>
                      <div><strong>Mode:</strong> {generatedCase.generationMode}</div>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-xl text-gray-900 dark:text-gray-100">PATIENT INFORMATION</h2>
                    </div>
                  </div>
                  
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-1/4"><strong>Patient ID:</strong></TableCell>
                        <TableCell>{generatedCase.patient.id}</TableCell>
                        <TableCell className="w-1/4"><strong>Name:</strong></TableCell>
                        <TableCell>{generatedCase.patient.name}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Age:</strong></TableCell>
                        <TableCell>{generatedCase.patient.age} years</TableCell>
                        <TableCell><strong>Gender:</strong></TableCell>
                        <TableCell>{generatedCase.patient.gender}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>Occupation:</strong></TableCell>
                        <TableCell colSpan={3}>{generatedCase.patient.occupation}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                {/* Chief Complaint */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">CHIEF COMPLAINT</h3>
                  <div className="bg-red-50 dark:bg-red-900/10 border-l-4 border-red-600 p-4 rounded">
                    <p className="text-gray-900 dark:text-gray-100">"{generatedCase.patient.chiefComplaint}"</p>
                  </div>
                </div>

                {/* History */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-4">HISTORY</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">HPC:</strong>
                      <p className="text-gray-700 dark:text-gray-300 ml-4 mt-1">{generatedCase.history.presentingComplaint}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">POH:</strong>
                      <p className="text-gray-700 dark:text-gray-300 ml-4 mt-1">{generatedCase.history.pastOcularHistory}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">PMH:</strong>
                      <p className="text-gray-700 dark:text-gray-300 ml-4 mt-1">{generatedCase.history.pastMedicalHistory}</p>
                    </div>
                  </div>
                </div>

                {/* Examination */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-4">EXAMINATION FINDINGS</h3>
                  
                  <div className="mb-4">
                    <strong className="text-gray-900 dark:text-gray-100 block mb-2">Visual Acuity & Refraction</strong>
                    <Table className="text-sm">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Eye</TableHead>
                          <TableHead>Distance VA</TableHead>
                          <TableHead>Refraction</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>OD</strong></TableCell>
                          <TableCell className="font-mono">{generatedCase.examination.visualAcuity.distanceOD}</TableCell>
                          <TableCell className="font-mono">{generatedCase.examination.refraction.dryOD}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>OS</strong></TableCell>
                          <TableCell className="font-mono">{generatedCase.examination.visualAcuity.distanceOS}</TableCell>
                          <TableCell className="font-mono">{generatedCase.examination.refraction.dryOS}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="mb-4">
                    <strong className="text-gray-900 dark:text-gray-100 block mb-2">IOP</strong>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      OD: {generatedCase.examination.iop.od} | OS: {generatedCase.examination.iop.os} ({generatedCase.examination.iop.method})
                    </p>
                  </div>

                  <div>
                    <strong className="text-gray-900 dark:text-gray-100 block mb-2">Fundus</strong>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{generatedCase.examination.fundus.method}</p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                        <strong>OD Disc:</strong> {generatedCase.examination.fundus.discOD}
                      </div>
                      <div className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded">
                        <strong>OS Disc:</strong> {generatedCase.examination.fundus.discOS}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Diagnosis */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">DIAGNOSIS</h3>
                  <div className="bg-amber-50 dark:bg-amber-900/10 border-l-4 border-amber-600 p-4 rounded">
                    <strong className="text-amber-900 dark:text-amber-100">Primary:</strong>
                    <p className="text-gray-900 dark:text-gray-100 mt-2">{generatedCase.diagnosis.primary}</p>
                  </div>
                </div>

                {/* Management */}
                <div className="border-b-2 border-gray-300 dark:border-gray-700 p-6">
                  <h3 className="text-lg text-gray-900 dark:text-gray-100 mb-3">MANAGEMENT PLAN</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-green-50 dark:bg-green-900/10 border-l-4 border-green-600 p-3 rounded">
                      <strong className="text-green-900 dark:text-green-100">Prescription:</strong>
                      <p className="font-mono text-gray-900 dark:text-gray-100 mt-2">{generatedCase.management.prescription}</p>
                    </div>
                    <div>
                      <strong className="text-gray-900 dark:text-gray-100">Patient Education:</strong>
                      <ul className="mt-2 space-y-1">
                        {generatedCase.management.patientEducation.map((item, idx) => (
                          <li key={idx} className="text-gray-700 dark:text-gray-300 ml-6 list-decimal">{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-600 p-3 rounded">
                      <strong className="text-blue-900 dark:text-blue-100">Follow-Up:</strong>
                      <p className="text-gray-900 dark:text-gray-100 mt-2">{generatedCase.management.followUp}</p>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-100 dark:bg-gray-800 p-4 text-center text-xs text-gray-600 dark:text-gray-400">
                  AI-Generated Clinical Case • For Educational Purposes Only • Not for Actual Patient Care
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chat - Right Side */}
          <div className="w-full md:w-96 lg:w-[28rem] border-l border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-gray-900 dark:text-gray-100">Interactive Chat</h3>
                </div>
              </div>
              
              {/* Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    setChatMode("learning");
                    setChatMessages([{
                      id: "mode-change",
                      role: "assistant",
                      content: "Switched to Learning Mode! I'll provide detailed explanations and guide you through understanding this case. What would you like to learn about?"
                    }]);
                  }}
                  variant={chatMode === "learning" ? "default" : "outline"}
                  size="sm"
                  className={`flex-1 ${chatMode === "learning" ? "bg-blue-600 text-white" : ""}`}
                >
                  <Brain className="h-4 w-4 mr-2" />
                  Learning
                </Button>
                <Button
                  onClick={() => {
                    setChatMode("quiz");
                    setChatMessages([{
                      id: "mode-change",
                      role: "assistant",
                      content: "Switched to Quiz Mode! I'll test your understanding with questions. Ready? Let's start: What do you think is the most important finding in this case?"
                    }]);
                  }}
                  variant={chatMode === "quiz" ? "default" : "outline"}
                  size="sm"
                  className={`flex-1 ${chatMode === "quiz" ? "bg-purple-600 text-white" : ""}`}
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Quiz
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-4">
                {chatMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : chatMode === "quiz"
                        ? "bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-200 dark:border-purple-800 text-gray-900 dark:text-gray-100"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
              <div className="flex gap-2">
                <Input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChatMessage()}
                  placeholder={chatMode === "learning" ? "Ask about the case..." : "Answer or ask a question..."}
                  className="flex-1"
                />
                <Button
                  onClick={sendChatMessage}
                  disabled={!chatInput.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {chatMode === "learning" ? "💡 Ask questions to understand the case better" : "🎯 Test your knowledge with interactive questions"}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}