import React, { useState, useEffect } from "react";
import {
  getUsers,
  deleteUser,
  addUser,
  generateCode,
  getCodes,
  deleteCode,
  getStages,
  getSubjects,
  searchUsers,
  addStage,
  addSubject,
  updateUser,
} from "../../api";
import {
  Container,
  Table,
  Button,
  Form,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import ModalForm from "../common/ModalForm";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [codes, setCodes] = useState([]);
  const [stages, setStages] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showGenerateCodeModal, setShowGenerateCodeModal] = useState(false);
  const [showAddStageModal, setShowAddStageModal] = useState(false);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showUsersTable, setShowUsersTable] = useState(true);
  const [showCodesTable, setShowCodesTable] = useState(true);
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stageName, setStageName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [stageId, setStageId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [error, setError] = useState("");
  const [generatedCodes, setGeneratedCodes] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditUserModal, setShowEditUserModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const data = await getCodes();
        setCodes(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch codes");
      }
    };
    fetchCodes();
  }, []);

  useEffect(() => {
    const fetchStages = async () => {
      try {
        const data = await getStages();
        setStages(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch stages");
      }
    };
    fetchStages();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete user");
    }
  };

  const handleDeleteCode = async (codeId) => {
    try {
      await deleteCode(codeId);
      setCodes(codes.filter((code) => code.id !== codeId));
    } catch (err) {
      console.error(err);
      setError("Failed to delete code");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = {
        fullName,
        password,
        role,
        code,
        stageId: stageId || null,
        subjectId: subjectId || null,
      };
      await addUser(newUser);
      alert("User added successfully!");
      setShowAddUserModal(false);
      setFullName("");
      setPassword("");
      setRole("student");
      setCode("");
      setStageId("");
      setSubjectId("");
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to add user");
    }
  };

  const handleGenerateCode = async (e) => {
    e.preventDefault();
    try {
      const data = await generateCode(
        role,
        quantity,
        stageId || null,
        subjectId || null
      );

      setGeneratedCodes(data.codes);
      setShowGenerateCodeModal(false);
      const codesData = await getCodes();
      setCodes(codesData);
    } catch (err) {
      console.error(err);
      setError("Failed to generate codes");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        id: editingUser.id,
        fullName,
        role,
        stageId,
        subjectId,
      });
      alert("User updated successfully!");
      setShowEditUserModal(false);
      setEditingUser(null);
      setFullName("");
      setRole("student");
      setStageId("");
      setSubjectId("");
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to update user");
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFullName(user.full_name);
    setRole(user.role);
    setStageId(user.stage_id);
    setSubjectId(user.subject_id);
    setShowEditUserModal(true);
  };

  const handleAddStage = async (e) => {
    e.preventDefault();
    try {
      await addStage({ name: stageName });
      alert("Stage added successfully!");
      setShowAddStageModal(false);
      setStageName("");
      const data = await getStages();
      setStages(data);
    } catch (err) {
      console.error(err);
      setError("Failed to add stage");
    }
  };

  const handleSearchUsers = async (e) => {
    e.preventDefault();
    try {
      const data = await searchUsers(searchQuery);
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to search users");
    }
  };

  const handleAddSubject = async (e) => {
    e.preventDefault();
    try {
      await addSubject({ name: subjectName });
      alert("Subject added successfully!");
      setShowAddSubjectModal(false);
      setSubjectName("");
      const data = await getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error(err);
      setError("Failed to add subject");
    }
  };

  const studentCodes = codes.filter((code) => code.role === "student");
  const teacherCodes = codes.filter((code) => code.role === "teacher");

  const renderTable = (data, columns, actions) => (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Full Name</th>
          <th>Role</th>
          <th>Stage</th>
          <th>Subject</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.full_name}</td>
            <td>{item.role}</td>
            <td>{item.stage_name}</td>
            <td>{item.subject_name}</td>
            <td>{actions(item)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );

  return (
    <Container className="mt-5">
      <h1>Admin Dashboard</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <div className="d-grid gap-2 d-md-block">
        <Button
          variant="primary"
          onClick={() => setShowAddUserModal(true)}
          className="mx-1"
        >
          Add User
        </Button>

        <Button
          variant="primary"
          onClick={() => setShowAddSubjectModal(true)}
          className="mx-1"
        >
          Add Subject
        </Button>

        <Button
          variant="primary"
          onClick={() => setShowAddStageModal(true)}
          className="mx-1"
        >
          Add Stage
        </Button>

        <Button
          variant="secondary"
          onClick={() => setShowGenerateCodeModal(true)}
          className="mx-1"
        >
          Generate Code
        </Button>
        <Button
          variant="dark"
          onClick={() => setShowUsersTable(!showUsersTable)}
          className="mx-1"
        >
          {showUsersTable ? "Hide Users Table" : "Show Users Table"}
        </Button>
        <Button
          variant="dark"
          onClick={() => setShowCodesTable(!showCodesTable)}
          className="mx-1"
        >
          {showCodesTable ? "Hide Codes Table" : "Show Codes Table"}
        </Button>
      </div>
      <Form className="mt-3" onSubmit={handleSearchUsers}>
        <Form.Control
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-sm-2"
        />
        <Button type="submit" variant="outline-success">
          Search
        </Button>
      </Form>
      {showUsersTable && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Stage</th>
              <th>Subject</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.full_name}</td>
                <td>{user.role}</td>
                <td>{user.stage_name}</td>
                <td>{user.subject_name}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => handleEditUser(user)}
                    className="ml-2"
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showCodesTable && (
        <Row className="mt-5">
          <Col>
            <h3>Student Codes</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Role</th>
                  <th>Stage</th>
                  <th>Used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentCodes.map((code) => (
                  <tr key={code.id}>
                    <td>{code.id}</td>
                    <td>{code.code}</td>
                    <td>{code.role}</td>
                    <td>{code.stage_name}</td>
                    <td>{code.used ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCode(code.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
          <Col>
            <h3>Teacher Codes</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Code</th>
                  <th>Role</th>
                  <th>Stage</th>
                  <th>Subject</th>
                  <th>Used</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teacherCodes.map((code) => (
                  <tr key={code.id}>
                    <td>{code.id}</td>
                    <td>{code.code}</td>
                    <td>{code.role}</td>
                    <td>{code.stage_name}</td>
                    <td>{code.subject_name}</td>
                    <td>{code.used ? "Yes" : "No"}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteCode(code.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {/* Add User Modal */}
      <ModalForm
        show={showAddUserModal}
        onHide={() => setShowAddUserModal(false)}
        title="Add User"
        error={error}
        onSubmit={handleAddUser}
        submitButtonText="Add User"
      >
        <Form.Group controlId="formFullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>
      </ModalForm>
      {/* Generate Code Modal */}
      <ModalForm
        show={showGenerateCodeModal}
        onHide={() => setShowGenerateCodeModal(false)}
        title="Generate Code"
        error={error}
        onSubmit={handleGenerateCode}
        submitButtonText="Generate Codes"
      >
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStage">
          <Form.Label>Stage</Form.Label>
          <Form.Control
            as="select"
            value={stageId}
            onChange={(e) => setStageId(e.target.value)}
          >
            <option value="">Select Stage</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {role === "teacher" && (
          <Form.Group controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              as="select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
        <Form.Group controlId="formQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </Form.Group>
        {generatedCodes.length > 0 && (
          <Alert variant="success" className="mt-3">
            Generated Codes: {generatedCodes.join(", ")}
          </Alert>
        )}
      </ModalForm>
      {/* Add Stage Modal */}
      <ModalForm
        show={showAddStageModal}
        onHide={() => setShowAddStageModal(false)}
        title="Add Stage"
        error={error}
        onSubmit={handleAddStage}
        submitButtonText="Add Stage"
      >
        <Form.Group controlId="formStageName">
          <Form.Label>Stage Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter stage name"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
            required
          />
        </Form.Group>
      </ModalForm>
      {/* Add Subject Modal */}
      <ModalForm
        show={showAddSubjectModal}
        onHide={() => setShowAddSubjectModal(false)}
        title="Add Subject"
        error={error}
        onSubmit={handleAddSubject}
        submitButtonText="Add Subject"
      >
        <Form.Group controlId="formSubjectName">
          <Form.Label>Subject Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter subject name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            required
          />
        </Form.Group>
      </ModalForm>
      <ModalForm
        show={showEditUserModal}
        onHide={() => setShowEditUserModal(false)}
        title="Edit User"
        error={error}
        onSubmit={handleUpdateUser}
        submitButtonText="Update User"
      >
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRole">
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Admin</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStage">
          <Form.Label>Stage</Form.Label>
          <Form.Control
            as="select"
            value={stageId}
            onChange={(e) => setStageId(e.target.value)}
          >
            <option value="">Select Stage</option>
            {stages.map((stage) => (
              <option key={stage.id} value={stage.id}>
                {stage.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        {role === "teacher" && (
          <Form.Group controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              as="select"
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        )}
      </ModalForm>
    </Container>
  );
};

export default AdminDashboard;
