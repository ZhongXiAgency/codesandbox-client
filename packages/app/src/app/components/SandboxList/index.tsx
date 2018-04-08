
import * as React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import { sandboxUrl } from 'common/utils/url-generator';
import getIcon from 'common/templates/icons';

import FullHeartIcon from 'react-icons/lib/fa/heart';
import EyeIcon from 'react-icons/lib/fa/eye';
import ForkIcon from 'react-icons/lib/go/repo-forked';

import DeleteSandboxButton from '../DeleteSandboxButton';
import PrivacyStatus from '../PrivacyStatus';

import { Sandbox } from 'app/store/modules/profile/types';

import { HeaderTitle, Table, StatTitle, StatBody, Body, SandboxRow } from './elements';

type Props = {
  sandboxes: Sandbox[];
  isCurrentUser: boolean;
  onDelete: (id: string) => void;
};

export const SandboxList: React.SFC<Props> = ({ sandboxes, isCurrentUser, onDelete }) => (
  <Table>
    <thead>
      <tr style={{ height: '3rem' }}>
        <HeaderTitle>Title</HeaderTitle>
        <HeaderTitle>Created</HeaderTitle>
        <HeaderTitle>Updated</HeaderTitle>
        <StatTitle />
        <StatTitle>
          <FullHeartIcon />
        </StatTitle>
        <StatTitle>
          <EyeIcon />
        </StatTitle>
        <StatTitle>
          <ForkIcon />
        </StatTitle>
        {isCurrentUser && <HeaderTitle />}
      </tr>
    </thead>
    <Body>
      {sandboxes.map((s, i) => {
        const Icon = getIcon(s.template.name);
        return (
          <SandboxRow index={i} key={s.id}>
            <td>
              <Link to={sandboxUrl(s)}>{s.title || s.id}</Link>
              <PrivacyStatus privacy={s.privacy} asIcon />
            </td>
            <td>{moment(s.insertedAt).format('ll')}</td>
            <td>{moment(s.updatedAt).format('ll')}</td>
            <StatBody>
              <Icon width={30} height={30} />
            </StatBody>
            <StatBody>{s.likeCount}</StatBody>
            <StatBody>{s.viewCount}</StatBody>
            <StatBody>{s.forkCount}</StatBody>
            {isCurrentUser && (
              <StatBody style={{ padding: '0.55rem 0.5rem', cursor: 'pointer' }}>
                <DeleteSandboxButton id={s.id} onDelete={onDelete} />
              </StatBody>
            )}
          </SandboxRow>
        );
      })}
    </Body>
  </Table>
);

export default SandboxList;
