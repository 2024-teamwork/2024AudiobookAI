import "./Sidebar.css";
import {useState} from 'react';


const sampleFiles = [
  {
    fileId: 1,
    fileName: "Generative AI",
    cosUrl: "https://arxiv.org/pdf/2309.07930",
  },
  {
    fileId: 2,
    fileName: "Generative Artificial Intelligence: A Systematic Review and Applications",
    cosUrl: "https://arxiv.org/html/2405.11029v1",
  },
  {
    fileId: 3,
    fileName: "The Rapid Adoption of Generative AI",
    cosUrl: "https://www.nber.org/papers/w32966",
  },
  {
    "fileId": 7,
    "fileName": "经济学原理.txt",
    "cosUrl": "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734492745419_134e46db-e59b-4280-9b6d-8c399a7f8c14_%E7%BB%8F%E6%B5%8E%E5%AD%A6%E5%8E%9F%E7%90%86.txt?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734492747%3B1993692747%26q-key-time%3D1734492747%3B1993692747%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D8eff3ea975975e0cb719675f0d46dcea62c6a170"
  },
  {
		"fileId": 6,
		"fileName": "Generative AI-Business & Information Systems Engineering.pdf",
		"cosUrl": "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734415933455_6fadee86-ab31-413b-8a6e-82755ddfe838_Generative%20AI-Business%20%26%20Information%20Systems%20Engineering.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734415948%3B1993615948%26q-key-time%3D1734415948%3B1993615948%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D6d0313cdb67bbf415ae9bd74d3e403774975eb78"
	},
  {
		"fileId": 5,
		"fileName": "The GenAI is out of the bottle_generative artificial intelligence from a business model innovation perspective.pdf",
		"cosUrl": "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734416101402_461e791d-da64-449d-8081-cfa7bfb73eed_The%20GenAI%20is%20out%20of%20the%20bottle_generative%20artificial%20intelligence%20from%20a%20business%20model%20innovation%20perspective.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734416130%3B1993616130%26q-key-time%3D1734416130%3B1993616130%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D2988c4b5f5e2248723a51496917ec6c5cc9ac336"
	},
  {
    fileId: 4,
    fileName:
      "The Cue-of-the-Cloud Effec - When Reminders of Online Information Availability Increase Purchase Intentions and Choice.pdf",
    cosUrl:
      "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1734407756859_2003d6bc-90ac-4591-8fa7-831dc302256f_The%20Cue-of-the-Cloud%20Effec%20-%20When%20Reminders%20of%20Online%20Information%20Availability%20Increase%20Purchase%20Intentions%20and%20Choice.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1734407757%3B1993607757%26q-key-time%3D1734407757%3B1993607757%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D5a4a01e0f14116f17c12029dba9eaf7aa38cc542",
  },
  {
    fileId: 8,
    fileName:
      "Text-to-audio Conversion Using LLMs to Preserve Character Identification.pdf",
    cosUrl:
      "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1735335050406_5012feae-e097-46be-9bbf-e602e41b80f7_SpencerChin_Dan%20Kimberg%20.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1735335050%3B1994535050%26q-key-time%3D1735335050%3B1994535050%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3Df129b53c6f03a2d5c8d6bab0651b8776d3b9493c",
  },
  {
    fileId: 9,
    fileName:
      "Generative AI and the Publishing Industry.pdf",
    cosUrl:
      "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1735335050749_ccaadefb-97ff-4b45-8334-a4008474decb_ClaireTucker.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1735335051%3B1994535051%26q-key-time%3D1735335051%3B1994535051%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D0ac8012160988b1895e5f7d62b7c03e8e0b2a2d1",
  },
  {
    fileId: 10,
    fileName:
      "Integrating synthesised narration into an audiobook service.pdf",
    cosUrl:
      "https://pdf-store-1257970690.cos.ap-shanghai.myqcloud.com/uploads/1735335046504_873245ac-63e7-4fee-accc-f1675c321728_KristinaBergquist.pdf?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKIDEKDtMcfU6WjiV5SREoBMRJxOcdRAnESS%26q-sign-time%3D1735335050%3B1994535050%26q-key-time%3D1735335050%3B1994535050%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D245a5703aec89a7c57902e9af1f51d15323a1f99",
  },
];

const FileList = ({ fileList = [], loading, onFileToggle, onDeleteFile, selectedFiles = [], setSelectedFiles }) => {
  // 合并传入的 fileList 和 sampleFiles，确保不会重复展示文件
  const combinedFiles = [...sampleFiles, ...fileList.filter(
    (file) => !sampleFiles.some((sample) => sample.fileId === file.fileId)
  )];

  // Store the filter criteria in a state
  const [fieldFilter, setFieldFilter] = useState("");

  // Update the filter criteria
  const onFieldFilter = (value) => {
    setFieldFilter(value.toLowerCase()); // Ensure case-insensitive matching
  };



  return (
    <div className="pdf-list">
      <h3>Uploaded Files</h3>
      {loading ? (
        <p>Loading files...</p>
      ) : combinedFiles.length > 0 ? (
        <>
          {combinedFiles.map((file, index) => (
            <div key={index} className="file-container">
              <label className="pdf-item">
                <input
                  type="checkbox"
                  checked={selectedFiles.some((selected) => selected.fileName === file.fileName)}
                  onChange={() => onFileToggle(file)} // Pass the entire file object to parent
                />
                <span className="pdf-name">{file.fileName}</span>
                <a href={file.cosUrl} target="_blank" rel="noopener noreferrer">
                  View
                </a>
                <button
                  className="delete-button"
                  onClick={() => onDeleteFile(file.fileId)} // Pass only the fileId
                >
                  Delete
                </button>
              </label>
            </div>
          ))}
        </>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};

export default FileList;