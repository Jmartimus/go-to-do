import React, { useState } from 'react';
import axios from 'axios';
import { Card, Header, Form, Input, Icon, Button } from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';

interface Item {
  ID: string;
  Task: string;
  Status: boolean;
}

let endpoint = 'http://localhost:8080';

const ToDoList = () => {
  const [task, setTask] = useState<string>('');
  const [items, setItems] = useState<Item[]>([]);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const onSubmit = () => {
    if (task !== '') {
      axios
        .post(
          endpoint + '/api/task',
          {
            task,
          },
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        )
        .then((res) => {
          getTask();
          setTask('');
          console.log(res);
        });
    }
  };

  const updateTask = (id: string) => {
    axios
      .put(endpoint + '/api/task/' + id, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        console.log(res);
        getTask();
      });
  };

  const undoTask = (id: string) => {
    axios
      .put(endpoint + '/api/undoTask/' + id, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        console.log(res);
        getTask();
      });
  };

  const deleteTask = (id: string) => {
    axios
      .delete(endpoint + '/api/deleteTask/' + id, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then((res) => {
        console.log(res);
        getTask();
      });
  };

  const getTask = () => {
    axios.get(endpoint + '/api/task').then((res) => {
      console.log(res);
      if (res.data) {
        setItems(
          res.data.map((item: any) => {
            let color: SemanticCOLORS = 'yellow';

            if (item.status) {
              color = 'green';
            }
            return (
              <Card key={item._id} color={color} fluid>
                <Card.Content>
                  <Card.Header textAlign="left">
                    <div style={{ wordWrap: 'break-word' }}>{item.task}</div>
                  </Card.Header>

                  <Card.Meta textAlign="right">
                    <Icon
                      name="check circle"
                      color="green"
                      onClick={() => updateTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Done</span>
                    <Icon
                      name="undo"
                      color="yellow"
                      onClick={() => undoTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Undo</span>
                    <Icon
                      name="delete"
                      color="red"
                      onClick={() => deleteTask(item._id)}
                    />
                    <span style={{ paddingRight: 10 }}>Delete</span>
                  </Card.Meta>
                </Card.Content>
              </Card>
            );
          })
        );
      } else {
        setItems([]);
      }
    });
  };

  return (
    <div>
      <div className="row">
        <Header className="header" as="h2">
          TO DO LIST
        </Header>
      </div>
      <div className="row">
        <Form onSubmit={onSubmit}>
          <Input
            type="text"
            name="task"
            onChange={onChange}
            value={task}
            fluid
            placeholder="Create Task"
          />
          <Button>Create Task</Button>
        </Form>
      </div>
      <div className="row">
        <Card.Group>{items}</Card.Group>
      </div>
    </div>
  );
};

export default ToDoList;
