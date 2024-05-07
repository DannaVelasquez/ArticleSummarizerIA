import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';import './resume.styles.css'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';

interface ResumeViewProps {
  summary: string;
}

function ResumeView({ summary }: ResumeViewProps) {
  return (
    <div id='resume' className="cover-resume">
      <div className="container-resume">
      <h1>Your resume here 
        <TaskAltOutlinedIcon fontSize='large' style={{marginLeft:'5px', marginBottom:'-5px', color:'greenyellow'}}/>
      </h1>
      <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {summary}
        </Typography>
      </CardContent>
    </Card>
      </div>
    </div>
  );
}

export default ResumeView;
