const Session = require("../models/Session");
const Question = require("../models/Question");
const { generateInterviewQA, generateConceptExplanation } = require("../config/gemini");

// Create a new session with AI-generated questions
const createSession = async (req, res) => {
  const { role, experience, description } = req.body;
  try {
    console.log('Step 1 - Body received:', req.body)
    console.log('Step 2 - User:', req.user)

    const qaList = await generateInterviewQA(role, experience, description);
    console.log('Step 3 - Gemini qaList:', qaList)

    const session = await Session.create({
      user: req.user.id,
      role,
      experience,
      description,
    });
    console.log('Step 4 - Session created:', session)

    const questionDocs = await Promise.all(
      qaList.map((qa) =>
        Question.create({
          session: session._id,
          question: qa.question,
          answer: qa.answer,
        })
      )
    );
    console.log('Step 5 - Questions saved:', questionDocs.length)

    session.questions = questionDocs.map((q) => q._id);
    await session.save();

    res.status(201).json({ session, questions: questionDocs });
  } catch (error) {
    console.error('EXACT ERROR HERE:', error.message)
    res.status(500).json({ message: "Failed to create session", error: error.message });
  }
};

// Get all sessions for logged-in user
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get a single session with all questions
const getSessionById = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const questions = await Question.find({ session: session._id });
    res.json({ session, questions });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a session
const deleteSession = async (req, res) => {
  try {
    await Question.deleteMany({ session: req.params.id });
    await Session.findByIdAndDelete(req.params.id);
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Toggle pin on a question
const togglePin = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.isPinned = !question.isPinned;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update note on a question
const updateNote = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    question.note = req.body.note;
    await question.save();
    res.json(question);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get AI explanation for a question
const getExplanation = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ message: "Question not found" });

    const explanation = await generateConceptExplanation(
      question.question,
      question.answer
    );
    res.json({ explanation });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createSession,
  getSessions,
  getSessionById,
  deleteSession,
  togglePin,
  updateNote,
  getExplanation,
};